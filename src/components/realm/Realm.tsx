import React from 'react';
import { cn } from '@/lib/cn';
import type { RealmName } from '@/design/tokens';

export interface RealmProps extends React.HTMLAttributes<HTMLElement> {
  name: RealmName;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Realm({
  name,
  as: Component = 'section',
  children,
  className,
  ...props
}: RealmProps) {
  return (
    <Component
      data-realm={name}
      className={cn(
        'bg-bg text-ink transition-colors duration-300',
        // House Corrino bands open with the imperial gold double rule.
        name === 'corrino' && 'border-t-4 border-double border-mark',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
