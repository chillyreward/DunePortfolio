import React from 'react';
import { ogSize, ogContentType, renderOgCard } from '@/lib/og';
import { profile } from '@/content/profile';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${profile.name} — ${profile.title}`;

export default function Image() {
  const fremenEye = (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#1E45C8" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="9" stroke="#1E45C8" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="4" fill="#1E45C8" />
    </svg>
  );

  return renderOgCard({
    realm: 'arrakis',
    badge: 'Arrakis',
    glyph: fremenEye,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1
          style={{
            fontSize: '76px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#231D14',
            textTransform: 'uppercase',
          }}
        >
          {profile.name}
        </h1>
        <p
          style={{
            fontSize: '28px',
            fontWeight: 400,
            lineHeight: 1.35,
            color: '#574E40',
            maxWidth: '900px',
            margin: 0,
          }}
        >
          {profile.positioning}
        </p>
      </div>
    ),
  });
}
