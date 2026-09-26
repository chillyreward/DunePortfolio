import * as React from 'react';
import { cn } from '@/lib/cn';

export interface EpigraphProps extends React.HTMLAttributes<HTMLElement> {
  text: string | null;
  attribution: string | null;
}

export function Epigraph({
  text,
  attribution,
  className,
  ...props
}: EpigraphProps) {
  if (!text || text.trim() === '') {
    return null;
  }

  return (
    <figure className={cn('space-y-3', className)} {...props}>
      <blockquote className="t-epigraph">
        {text}
      </blockquote>
      {attribution && attribution.trim() !== '' && (
        <figcaption className="t-meta">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
