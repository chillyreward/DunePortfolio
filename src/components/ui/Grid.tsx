import * as React from 'react';
import { cn } from '@/lib/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Grid({ children, className, ...props }: GridProps) {
  return (
    <div className={cn('grid grid-cols-4 md:grid-cols-12 gap-4 sm:gap-6', className)} {...props}>
      {children}
    </div>
  );
}
