import React from 'react';
import { cn } from '@/lib/cn';
import { RealmGlyph, type RealmGlyphType } from './RealmGlyph';
import type { RealmName } from '@/design/tokens';

export interface ImperialRuleProps {
  realm?: RealmName;
  className?: string;
}

export function ImperialRule({ realm, className }: ImperialRuleProps) {
  return (
    <div className={cn('relative flex items-center justify-center my-12', className)} role="separator">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-line" />
      </div>
      <div className="relative px-4 bg-bg text-mark">
        {realm ? (
          <RealmGlyph realm={realm as RealmGlyphType} size={14} className="text-mark" />
        ) : (
          <div className="w-1.5 h-1.5 rotate-45 border border-mark bg-bg" />
        )}
      </div>
    </div>
  );
}
