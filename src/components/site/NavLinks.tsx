'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavActive, type NavMatchMode } from '@/lib/nav';
import { cn } from '@/lib/cn';

export interface NavItemProp {
  label: string;
  href: string;
  match: NavMatchMode;
}

export interface NavLinksProps {
  items: readonly NavItemProp[] | NavItemProp[];
  className?: string;
}

export function NavLinks({ items, className }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-8">
        {items.map((item) => {
          const active = isNavActive(pathname, item.href, item.match);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center min-h-11 text-[15px] font-medium text-ink transition-colors',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-sm',
                  active
                    ? 'underline decoration-1 underline-offset-[6px]'
                    : 'hover:underline hover:decoration-1 hover:underline-offset-[6px] focus-visible:underline focus-visible:decoration-1 focus-visible:underline-offset-[6px]'
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
