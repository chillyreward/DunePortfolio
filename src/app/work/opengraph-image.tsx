import React from 'react';
import { ogSize, ogContentType, renderOgCard } from '@/lib/og';
import { getProjects } from '@/content/projects';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Selected Projects — Lenny Kidavi';

export default function Image() {
  const projects = getProjects({ visibility: 'production' });
  const productCount = projects.filter((p) => p.type === 'product').length;
  const clientCount = projects.filter((p) => p.type === 'client').length;

  const atreidesGlyph = (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11 12 4l8 7" />
      <path d="M5 17l7-6 7 6" />
      <path d="M12 2v3" />
    </svg>
  );

  return renderOgCard({
    realm: 'atreides',
    badge: 'Atreides / Corrino',
    glyph: atreidesGlyph,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#80A892',
          }}
        >
          Selected Projects
        </span>

        <h1
          style={{
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#F0F2EE',
            textTransform: 'uppercase',
          }}
        >
          Work & Case Studies
        </h1>

        <div style={{ display: 'flex', gap: '32px', marginTop: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#C5A059' }}>{productCount}</span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#A0ACA5', textTransform: 'uppercase' }}>Products Shipped</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#C5A059' }}>{clientCount}</span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#A0ACA5', textTransform: 'uppercase' }}>Client Deployments</span>
          </div>
        </div>
      </div>
    ),
  });
}
