'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          'w-[44px] h-[44px] inline-flex items-center justify-center rounded text-ink/20 pointer-events-none',
          className
        )}
        {...props}
      >
        <span className="w-5 h-5 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      className={cn(
        'w-[44px] h-[44px] inline-flex items-center justify-center rounded text-ink hover:bg-ink/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]',
        className
      )}
      {...props}
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
