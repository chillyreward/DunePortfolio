import React from 'react';
import { ogSize, ogContentType, renderOgCard, ogGlyph } from '@/lib/og';
import { ui } from '@/content/ui';
import { profile } from '@/content/profile';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${profile.name} — ${profile.title}`;

export default function Image() {
  return renderOgCard({
    realm: 'arrakis',
    badge: ui.realms.arrakis,
    glyph: ogGlyph('arrakis'),
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
