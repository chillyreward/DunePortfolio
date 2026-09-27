'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { serverEnv } from '@/lib/env.server';
import { contact } from '@/content/contact';

export interface ContactState {
  status: 'idle' | 'error' | 'success';
  fieldErrors?: Partial<Record<'name' | 'email' | 'topic' | 'message', string>>;
  message?: string;
  values?: {
    name: string;
    email: string;
    topic: string;
    message: string;
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

let ratelimit: Ratelimit | null = null;
if (serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: serverEnv.UPSTASH_REDIS_REST_URL,
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '10 m'),
    prefix: 'portfolio-contact',
  });
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const company = (formData.get('company') as string)?.trim() || '';
  const startedAtStr = (formData.get('startedAt') as string)?.trim() || '';

  // 1. Honeypot check
  if (company.length > 0) {
    return { status: 'success' };
  }

  // 2. Time trap check (only when startedAt is provided by JS client)
  if (startedAtStr) {
    const startedAt = parseInt(startedAtStr, 10);
    if (!isNaN(startedAt)) {
      const elapsed = Date.now() - startedAt;
      if (elapsed < 3000) {
        return { status: 'success' };
      }
    }
  }

  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const topic = ((formData.get('topic') as string) || '').trim();
  const message = ((formData.get('message') as string) || '').trim();

  const values = { name, email, topic, message };
  const fieldErrors: Partial<Record<'name' | 'email' | 'topic' | 'message', string>> = {};

  // 3. Validation
  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = contact.errors.name;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    fieldErrors.email = contact.errors.email;
  }

  if (!topic || !contact.topics.includes(topic as (typeof contact.topics)[number])) {
    fieldErrors.topic = contact.errors.topic;
  }

  if (message.length < 20) {
    fieldErrors.message = contact.errors.message;
  } else if (message.length > 2000) {
    fieldErrors.message = contact.errors.messageLong;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      fieldErrors,
      values,
      message: contact.errorSummary,
    };
  }

  // 4. Rate limiting check (when configured)
  if (ratelimit) {
    const headerList = headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return {
          status: 'error',
          message: contact.errors.rateLimited,
          values,
        };
      }
    } catch {
      // If redis check fails, do not block the user
    }
  }

  // 5. Send message
  const isDryRun =
    serverEnv.CONTACT_DRY_RUN === '1' ||
    (!serverEnv.RESEND_API_KEY && process.env.NODE_ENV !== 'production');

  if (isDryRun) {
    console.info('Contact form submission (dry run):', {
      name,
      email,
      topic,
      length: message.length,
    });
    return { status: 'success' };
  }

  if (!serverEnv.RESEND_API_KEY) {
    return {
      status: 'error',
      message: contact.errors.failed,
      values,
    };
  }

  // Header injection prevention: strip carriage returns and newlines
  const cleanName = name.replace(/[\r\n]+/g, ' ');
  const cleanTopic = topic.replace(/[\r\n]+/g, ' ');

  const resend = new Resend(serverEnv.RESEND_API_KEY);

  const plainText = `From: ${cleanName} <${email}>\nTopic: ${cleanTopic}\n\nMessage:\n${message}`;
  const htmlContent = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2>New message from portfolio contact form</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Topic:</strong> ${escapeHtml(cleanTopic)}</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: serverEnv.CONTACT_FROM,
      to: [serverEnv.CONTACT_TO],
      replyTo: email,
      subject: `Portfolio: ${cleanTopic} from ${cleanName}`,
      text: plainText,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error code:', error.name || 'RESEND_ERROR');
      return {
        status: 'error',
        message: contact.errors.failed,
        values,
      };
    }

    return { status: 'success' };
  } catch (err: unknown) {
    const errorCode = err && typeof err === 'object' && 'name' in err ? (err as { name: string }).name : 'UNKNOWN';
    console.error('Resend error code:', errorCode);
    return {
      status: 'error',
      message: contact.errors.failed,
      values,
    };
  }
}
