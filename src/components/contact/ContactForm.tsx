'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendContact, ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export interface ContactFormProps {
  formHeading: string;
  fields: {
    name: { label: string };
    email: { label: string; hint?: string };
    topic: { label: string };
    message: { label: string; hint?: string };
  };
  topics: readonly string[];
  submit: string;
  submitting: string;
  errorSummary: string;
  errors: {
    name: string;
    email: string;
    topic: string;
    message: string;
    messageLong: string;
    rateLimited: string;
    failed: string;
  };
  success: {
    heading: string;
    body: string;
  };
  fallbackEmail: string;
  className?: string;
}

function SubmitButton({ submitText, submittingText }: { submitText: string; submittingText: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending}
      aria-disabled={pending}
      className="w-full sm:w-auto min-h-[48px]"
    >
      {pending ? submittingText : submitText}
    </Button>
  );
}

export function ContactForm({
  fields,
  topics,
  submit,
  submitting,
  errorSummary,
  errors,
  success,
  fallbackEmail,
  className,
}: ContactFormProps) {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [state, formAction] = useFormState<ContactState, FormData>(sendContact, {
    status: 'idle',
  });

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === 'error' && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    } else if (state.status === 'success' && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div
        className={cn(
          'p-8 sm:p-10 border border-line bg-surface/40 rounded-[2px] space-y-4',
          className
        )}
      >
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="t-h3 text-ink outline-none"
        >
          {success.heading}
        </h3>
        <p className="t-body text-ink-2 font-sans leading-relaxed">
          {success.body}
        </p>
      </div>
    );
  }

  const hasFieldErrors = Boolean(state.fieldErrors && Object.keys(state.fieldErrors).length > 0);

  return (
    <form
      action={formAction}
      noValidate
      className={cn('space-y-6', className)}
    >
      {/* Honeypot field (hidden from assistive technologies and users) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Time-trap field */}
      <input
        type="hidden"
        name="startedAt"
        value={startedAt !== null ? startedAt : ''}
      />

      {/* Error Summary Alert */}
      {state.status === 'error' && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="p-4 rounded-[2px] border border-line bg-surface/70 text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent space-y-2"
        >
          <p className="t-small font-semibold text-ink flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-4 h-4 rounded border border-ink text-[10px]"
            >
              !
            </span>
            <span>{state.message || errorSummary}</span>
          </p>

          {hasFieldErrors && (
            <ul className="t-small space-y-1 pl-5 list-disc text-ink-2">
              {state.fieldErrors?.name && (
                <li>
                  <a href="#field-name" className="underline hover:text-ink">
                    {state.fieldErrors.name}
                  </a>
                </li>
              )}
              {state.fieldErrors?.email && (
                <li>
                  <a href="#field-email" className="underline hover:text-ink">
                    {state.fieldErrors.email}
                  </a>
                </li>
              )}
              {state.fieldErrors?.topic && (
                <li>
                  <a href="#field-topic" className="underline hover:text-ink">
                    {state.fieldErrors.topic}
                  </a>
                </li>
              )}
              {state.fieldErrors?.message && (
                <li>
                  <a href="#field-message" className="underline hover:text-ink">
                    {state.fieldErrors.message}
                  </a>
                </li>
              )}
            </ul>
          )}

          {state.message === errors.failed && (
            <p className="text-xs font-sans text-ink-2 pt-2 border-t border-line/60">
              Direct email:{' '}
              <a
                href={`mailto:${fallbackEmail}`}
                className="text-accent underline"
              >
                {fallbackEmail}
              </a>
            </p>
          )}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="field-name"
          className="t-meta text-ink mb-1.5 block font-medium"
        >
          {fields.name.label}
        </label>
        <input
          id="field-name"
          type="text"
          name="name"
          autoComplete="name"
          defaultValue={state.values?.name || ''}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? 'field-name-error' : undefined}
          className="h-12 w-full bg-surface border border-line rounded-[2px] px-4 text-ink font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {state.fieldErrors?.name && (
          <p
            id="field-name-error"
            className="t-small text-ink mt-1.5 flex items-center gap-1.5"
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-3.5 h-3.5 rounded border border-ink text-[9px] font-bold"
            >
              !
            </span>
            <span>{state.fieldErrors.name}</span>
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="field-email"
          className="t-meta text-ink mb-1.5 block font-medium"
        >
          {fields.email.label}
          {fields.email.hint && (
            <span className="text-ink-2 font-normal ml-2">({fields.email.hint})</span>
          )}
        </label>
        <input
          id="field-email"
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state.values?.email || ''}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? 'field-email-error' : undefined}
          className="h-12 w-full bg-surface border border-line rounded-[2px] px-4 text-ink font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {state.fieldErrors?.email && (
          <p
            id="field-email-error"
            className="t-small text-ink mt-1.5 flex items-center gap-1.5"
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-3.5 h-3.5 rounded border border-ink text-[9px] font-bold"
            >
              !
            </span>
            <span>{state.fieldErrors.email}</span>
          </p>
        )}
      </div>

      {/* Topic Field */}
      <div>
        <label
          htmlFor="field-topic"
          className="t-meta text-ink mb-1.5 block font-medium"
        >
          {fields.topic.label}
        </label>
        <div className="relative">
          <select
            id="field-topic"
            name="topic"
            defaultValue={state.values?.topic || ''}
            aria-invalid={Boolean(state.fieldErrors?.topic)}
            aria-describedby={state.fieldErrors?.topic ? 'field-topic-error' : undefined}
            className="h-12 w-full bg-surface border border-line rounded-[2px] px-4 text-ink font-sans text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent pr-10"
          >
            <option value="" disabled>
              Choose one
            </option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-2">
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {state.fieldErrors?.topic && (
          <p
            id="field-topic-error"
            className="t-small text-ink mt-1.5 flex items-center gap-1.5"
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-3.5 h-3.5 rounded border border-ink text-[9px] font-bold"
            >
              !
            </span>
            <span>{state.fieldErrors.topic}</span>
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="field-message"
          className="t-meta text-ink mb-1.5 block font-medium"
        >
          {fields.message.label}
          {fields.message.hint && (
            <span className="text-ink-2 font-normal ml-2">({fields.message.hint})</span>
          )}
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={6}
          defaultValue={state.values?.message || ''}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? 'field-message-error' : undefined}
          className="w-full bg-surface border border-line rounded-[2px] p-4 text-ink font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed resize-y"
        />
        {state.fieldErrors?.message && (
          <p
            id="field-message-error"
            className="t-small text-ink mt-1.5 flex items-center gap-1.5"
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-3.5 h-3.5 rounded border border-ink text-[9px] font-bold"
            >
              !
            </span>
            <span>{state.fieldErrors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton submitText={submit} submittingText={submitting} />
      </div>
    </form>
  );
}
