import * as React from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'header' | 'footer';
  id?: string;
  spacing?: 'default' | 'tight' | 'none';
  bleed?: boolean;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function Section({
  as: Component = 'section',
  id,
  spacing = 'default',
  bleed = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const spacingClass =
    spacing === 'default'
      ? 'py-section'
      : spacing === 'tight'
        ? 'py-[clamp(48px,6vw,96px)]'
        : '';

  return (
    <Component id={id} className={cn(spacingClass, className)} {...props}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Component>
  );
}
