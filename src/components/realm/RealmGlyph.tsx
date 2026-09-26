import React from 'react';

export type RealmGlyphType = 'arrakis' | 'fremen' | 'atreides' | 'corrino' | 'harkonnen';

export interface RealmGlyphProps {
  realm: RealmGlyphType;
  size?: number;
  className?: string;
}

export function RealmGlyph({ realm, size = 24, className = '' }: RealmGlyphProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: `inline-block shrink-0 ${className}`.trim(),
    'aria-hidden': true,
  };

  switch (realm) {
    case 'arrakis':
      // Sun over horizon with descending heat rays (the desert noon)
      return (
        <svg {...commonProps} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          {/* Sun arc */}
          <path d="M4 12a8 8 0 0 1 16 0" />
          {/* Horizon */}
          <path d="M2 12h20" />
          {/* Vertical heat rays */}
          <path d="M7 16v4" />
          <path d="M12 15v6" />
          <path d="M17 16v4" />
        </svg>
      );

    case 'fremen':
      // Crysknife blade curved silhouette with base water droplet dot
      return (
        <svg {...commonProps} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          {/* Crysknife blade curved spine and tapered point */}
          <path d="M12 2c2 4 4 8 4 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4c0-4 2-8 4-12z" />
          {/* Center rib line */}
          <path d="M12 2v16" />
          {/* Water droplet at base */}
          <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'atreides':
      // Upward angular hawk-wing double chevron
      return (
        <svg {...commonProps} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          {/* Upper chevron */}
          <path d="M4 11 12 4l8 7" />
          {/* Lower chevron */}
          <path d="M5 17l7-6 7 6" />
          {/* Vertical axis pin */}
          <path d="M12 2v3" />
        </svg>
      );

    case 'corrino':
      // Imperial lion-sun crown over seal
      return (
        <svg {...commonProps} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          {/* Five crown rays */}
          <path d="M5 11l-1-5 4 2 4-6 4 6 4-2-1 5" />
          {/* Base imperial orb */}
          <circle cx="12" cy="16" r="4.5" />
          {/* Inner core */}
          <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'harkonnen':
      // Heavy brutalist octagonal gear/aperture (Giedi Prime black sun)
      return (
        <svg {...commonProps} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          {/* Octagon perimeter */}
          <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" />
          {/* Hollow central aperture */}
          <circle cx="12" cy="12" r="4" />
          {/* Radial brutalist cross-notches */}
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
        </svg>
      );
  }
}
