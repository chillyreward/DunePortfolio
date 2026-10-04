import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import React from 'react';

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = 'image/png';

export type OgRealm = 'arrakis' | 'atreides' | 'corrino' | 'fremen';

export const realmColors: Record<
  OgRealm,
  { bg: string; ink: string; ink2: string; accent: string; mark: string; border: string }
> = {
  arrakis: {
    bg: '#D9CBB0',
    ink: '#231D14',
    ink2: '#574E40',
    accent: '#1E45C8',
    mark: '#1E45C8',
    border: '#B8A88A',
  },
  atreides: {
    bg: '#141C18',
    ink: '#F0F2EE',
    ink2: '#A0ACA5',
    accent: '#80A892',
    mark: '#C5A059',
    border: '#283830',
  },
  corrino: {
    bg: '#F5F0E6',
    ink: '#1C1824',
    ink2: '#5A5264',
    accent: '#7B52A8',
    mark: '#8D6407',
    border: '#DDD4C2',
  },
  fremen: {
    bg: '#2A2D2E',
    ink: '#EBE6DC',
    ink2: '#AAAFB2',
    accent: '#1E45C8',
    mark: '#DAA520',
    border: '#454A4D',
  },
};

// The site's realm glyphs (RealmGlyph paths), drawn in the realm's mark colour.
export function ogGlyph(realm: OgRealm, size = 36) {
  const stroke = realmColors[realm].mark;
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (realm === 'arrakis') {
    return (
      <svg {...common}>
        <circle cx="9" cy="15" r="6.5" />
        <circle cx="19" cy="5" r="2.5" />
      </svg>
    );
  }
  if (realm === 'atreides') {
    return (
      <svg {...common}>
        <path d="M2 7c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
        <path d="M2 12c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
        <path d="M2 17c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5 0" />
      </svg>
    );
  }
  if (realm === 'corrino') {
    return (
      <svg {...common}>
        <path d="M12 2 22 12 12 22 2 12z" />
        <path d="M12 8 16 12 12 16 8 12z" fill={stroke} stroke="none" />
      </svg>
    );
  }
  return null;
}

export function loadOgFonts() {
  const fontExpanded800 = fs.readFileSync(
    path.join(process.cwd(), 'assets/fonts/archivo-expanded-800.ttf')
  );
  const font600 = fs.readFileSync(
    path.join(process.cwd(), 'assets/fonts/archivo-600.ttf')
  );
  const font400 = fs.readFileSync(
    path.join(process.cwd(), 'assets/fonts/archivo-400.ttf')
  );

  return [
    {
      name: 'Archivo',
      data: fontExpanded800,
      weight: 800 as const,
      style: 'normal' as const,
    },
    {
      name: 'Archivo',
      data: font600,
      weight: 600 as const,
      style: 'normal' as const,
    },
    {
      name: 'Archivo',
      data: font400,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

export function renderOgCard({
  realm = 'arrakis',
  badge,
  glyph,
  children,
}: {
  realm?: OgRealm;
  badge?: string;
  glyph?: React.ReactNode;
  children: React.ReactNode;
}) {
  const c = realmColors[realm];
  const fonts = loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: c.bg,
          color: c.ink,
          fontFamily: 'Archivo',
          padding: '64px 72px',
          border: `2px solid ${c.border}`,
          position: 'relative',
        }}
      >
        {/* Top bar with glyph and badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {glyph}
            {badge && (
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: c.mark,
                }}
              >
                {badge}
              </span>
            )}
          </div>

          <span
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: c.ink2,
            }}
          >
            lennydev.vercel.app
          </span>
        </div>

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            margin: '24px 0',
          }}
        >
          {children}
        </div>

        {/* Bottom bar rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${c.border}`,
            paddingTop: '20px',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: c.ink2,
            }}
          >
            Lenny Kidavi · Nairobi, Kenya
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts,
    }
  );
}
