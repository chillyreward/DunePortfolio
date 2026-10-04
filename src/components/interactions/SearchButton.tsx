'use client';

import { openSearch } from '@/lib/toast';
import { cn } from '@/lib/cn';

export function SearchButton({ label, className, onBeforeOpen }: { label: string; className?: string; onBeforeOpen?: () => void }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        if (onBeforeOpen) {
          // Let the caller's own dialog close (and restore its focus) first.
          onBeforeOpen();
          window.setTimeout(openSearch, 50);
        } else {
          openSearch();
        }
      }}
      className={cn('inline-flex items-center min-h-11 text-[15px] font-medium text-ink hover:text-accent transition-colors', className)}
    >
      {label}
    </button>
  );
}
