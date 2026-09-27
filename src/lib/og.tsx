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
    mark: '#8C7D6B',
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
    mark: '#A67608',
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
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
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
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: c.ink2,
            }}
          >
            LENNYDEV.VERCEL.APP
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
            Lenny Kidavi · Independent Developer & CS Student · Nairobi, Kenya
          </span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: c.accent,
            }}
          >
            Dune-Crafted Portfolio
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
