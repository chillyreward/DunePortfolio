import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { VisuallyHidden } from './VisuallyHidden';

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  download?: boolean | string;
}

export function TextLink({
  href,
  download,
  className,
  children,
  ...props
}: TextLinkProps) {
  const baseStyles =
    'text-accent underline underline-offset-4 decoration-1 hover:decoration-2 transition-all';

  const classes = cn(baseStyles, className);
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
        {...props}
      >
        {children}
        <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
      </a>
    );
  }

  return (
    <Link href={href} download={download} className={classes} {...props}>
      {children}
    </Link>
  );
}
