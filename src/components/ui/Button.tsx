import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { VisuallyHidden } from './VisuallyHidden';

export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export function Button({
  variant = 'ghost',
  href,
  download,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center h-12 px-5 text-[15px] font-medium rounded gap-2 transition-colors disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-[18px]';

  const variantStyles = {
    primary: 'bg-accent text-accent-ink hover:bg-accent/90',
    ghost: 'border border-line text-ink hover:bg-ink/5',
  }[variant];

  const classes = cn(baseStyles, variantStyles, className);

  if (href) {
    const isExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//');

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          download={download}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
      );
    }

    return (
      <Link
        href={href}
        download={download}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
