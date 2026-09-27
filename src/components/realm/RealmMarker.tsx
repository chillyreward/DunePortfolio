import React from 'react';
import { cn } from '@/lib/cn';
import { RealmGlyph, type RealmGlyphType } from './RealmGlyph';
import type { RealmName } from '@/design/tokens';

export interface RealmMarkerProps {
  realm: RealmName;
  className?: string;
  showLabel?: boolean;
}

export function RealmMarker({ realm, className, showLabel = true }: RealmMarkerProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-1.5 text-mark select-none cursor-default print:hidden', className)}
      aria-label={`Realm: ${realm}`}
      data-realm-marker="true"
    >
      <RealmGlyph realm={realm as RealmGlyphType} size={14} className="text-mark" />
      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-widest font-sans text-mark">
          {realm}
        </span>
      )}
    </div>
  );
}
