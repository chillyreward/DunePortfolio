import React from 'react';
import { cn } from '@/lib/cn';
import { RealmGlyph } from './RealmGlyph';
import { ui } from '@/content/ui';
import type { RealmName } from '@/design/tokens';

export interface RealmMarkerProps {
  realm: RealmName;
  className?: string;
  showLabel?: boolean;
}

export function RealmMarker({ realm, className, showLabel = true }: RealmMarkerProps) {
  return (
    <p
      className={cn('inline-flex items-center gap-2 text-mark select-none print:hidden', className)}
      data-realm-marker={realm}
    >
      <RealmGlyph realm={realm} size={16} />
      {showLabel && <span className="t-meta text-mark">{ui.realms[realm]}</span>}
    </p>
  );
}
