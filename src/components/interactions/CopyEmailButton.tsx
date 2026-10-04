'use client';

import { showToast } from '@/lib/toast';
import { cn } from '@/lib/cn';

export interface CopyEmailButtonProps {
  email: string;
  label: string;
  done: string;
  failed: string;
  className?: string;
}

export async function copyEmailToClipboard(email: string, done: string, failed: string) {
  try {
    await navigator.clipboard.writeText(email);
    showToast(done);
  } catch {
    showToast(failed);
  }
}

export function CopyEmailButton({ email, label, done, failed, className }: CopyEmailButtonProps) {
  return (
    <button
      type="button"
      onClick={() => copyEmailToClipboard(email, done, failed)}
      className={cn(
        'inline-flex items-center justify-center h-12 px-5 text-[15px] font-medium rounded border border-line text-ink hover:bg-ink/5 transition-colors',
        className
      )}
    >
      {label}
    </button>
  );
}
