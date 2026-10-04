'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { RealmGlyph } from '@/components/realm/RealmGlyph';
import type { RealmName } from '@/design/tokens';

export interface RealmCompassProps {
  labels: Record<RealmName, string>;
}

const HEADER_LINE = 80; // px from the top: just under the 72px sticky header

// Shows which realm band is under the header (desktop only, decorative).
export function RealmCompass({ labels }: RealmCompassProps) {
  const [realm, setRealm] = useState<RealmName>('arrakis');
  const pathname = usePathname();

  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>('main [data-realm]')).filter(
      (el) => el.tagName !== 'SPAN'
    );

    const update = () => {
      const current = bands.find((el) => {
        const box = el.getBoundingClientRect();
        return box.top <= HEADER_LINE && box.bottom > HEADER_LINE;
      });
      setRealm((current?.dataset.realm as RealmName | undefined) ?? 'arrakis');
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: `-${HEADER_LINE}px 0px -${Math.max(window.innerHeight - HEADER_LINE - 1, 0)}px 0px`,
    });
    bands.forEach((el) => observer.observe(el));
    update();
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div aria-hidden="true" className="hidden lg:flex items-center min-w-[9.5rem] t-meta text-ink-2">
      <span key={realm} className="compass-fade inline-flex items-center gap-2">
        <RealmGlyph realm={realm} size={14} />
        {labels[realm]}
      </span>
    </div>
  );
}
