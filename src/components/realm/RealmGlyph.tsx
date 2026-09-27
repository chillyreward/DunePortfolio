import React from 'react';

export type RealmGlyphType = 'arrakis' | 'fremen' | 'atreides' | 'corrino' | 'harkonnen';

export interface RealmGlyphProps {
  realm: RealmGlyphType;
  size?: number;
  className?: string;
}

// Original geometric glyphs (brief §3B). No house crests or film marks.
export function RealmGlyph({ realm, size = 24, className = '' }: RealmGlyphProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    xmlns: 'http://www.w3.org/2000/svg',
    className: `inline-block shrink-0 ${className}`.trim(),
    'aria-hidden': true,
  };

  switch (realm) {
    case 'arrakis':
      // Two moons: a large moon and a smaller one above it
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="15" r="6.5" />
          <circle cx="19" cy="5" r="2.5" />
        </svg>
      );

    case 'fremen':
      // Eye with a filled pupil
      return (
        <svg {...commonProps}>
          <path d="M2 12c2.8-4.7 6.1-7 10-7s7.2 2.3 10 7c-2.8 4.7-6.1 7-10 7s-7.2-2.3-10-7z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'atreides':
      // Three Caladan waves
      return (
        <svg {...commonProps}>
          <path d="M2 7c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
          <path d="M2 12c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
          <path d="M2 17c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
        </svg>
      );

    case 'corrino':
      // Diamond seal: outer diamond with a filled inner diamond
      return (
        <svg {...commonProps}>
          <path d="M12 2 22 12 12 22 2 12z" />
          <path d="M12 8 16 12 12 16 8 12z" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'harkonnen':
      // Black sun: filled disc inside a thin ring
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
