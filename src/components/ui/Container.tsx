import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-container px-gutter', className)} {...props}>
      {children}
    </div>
  );
}
