import * as React from 'react';
import { cn } from '@/lib/cn';
import { VisuallyHidden } from './VisuallyHidden';

export interface WordmarkProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  fit?: boolean;
}

export function Wordmark({
  text,
  as: Component = 'p',
  fit = false,
  className,
  ...props
}: WordmarkProps) {
  if (!fit) {
    return (
      <Component className={cn('t-wordmark', className)} {...props}>
        {text}
      </Component>
    );
  }

  // Tuned for "KIDAVI" with Archivo (font-stretch: 125%, font-weight: 800):
  // Natural text width is within ±3% of 1000 at fontSize ~196px.
  // Cap-height is ~142px; baseline y = 148; viewBox height H = 160.
  // aria-hidden="true" applied; real text preserved for screen readers via VisuallyHidden.
  return (
    <div className={cn('w-full leading-none', className)}>
      <VisuallyHidden>{text}</VisuallyHidden>
      <svg
        viewBox="0 0 1000 160"
        width="100%"
        aria-hidden="true"
        className="block w-full h-auto"
      >
        <text
          x="0"
          y="148"
          textLength="1000"
          lengthAdjust="spacing"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontStretch: '125%',
            fontWeight: 800,
            fill: 'currentColor',
            fontSize: '196px',
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
