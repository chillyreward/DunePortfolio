import 'server-only';
import { z } from 'zod';

const ServerEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO: z.string().email().default('lennykidavik@gmail.com'),
  CONTACT_FROM: z.string().min(1).default('Lenny Kidavi Portfolio <onboarding@resend.dev>'),
  CONTACT_DRY_RUN: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

export const serverEnv = ServerEnvSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  CONTACT_TO: process.env.CONTACT_TO || undefined,
  CONTACT_FROM: process.env.CONTACT_FROM || undefined,
  CONTACT_DRY_RUN: process.env.CONTACT_DRY_RUN || undefined,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || undefined,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || undefined,
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;
