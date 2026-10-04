import React from 'react';
import { ogSize, ogContentType, renderOgCard, ogGlyph, realmColors } from '@/lib/og';
import { workContent } from '@/content/work';
import { ui } from '@/content/ui';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${workContent.heading} — Lenny Kidavi`;

export default function Image() {
  const c = realmColors.atreides;

  return renderOgCard({
    realm: 'atreides',
    badge: ui.realms.atreides,
    glyph: ogGlyph('atreides'),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: 0,
            color: c.ink,
            textTransform: 'uppercase',
          }}
        >
          {workContent.heading}
        </h1>
        <p style={{ fontSize: '28px', fontWeight: 400, lineHeight: 1.4, color: c.ink2, margin: 0 }}>
          {workContent.lead}
        </p>
      </div>
    ),
  });
}
