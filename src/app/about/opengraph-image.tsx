import React from 'react';
import path from 'node:path';
import sharp from 'sharp';
import { ogSize, ogContentType, renderOgCard, ogGlyph } from '@/lib/og';
import { ui } from '@/content/ui';
import { profile } from '@/content/profile';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `About ${profile.name}`;

export default async function Image() {
  const portraitBuffer = await sharp(
    path.join(process.cwd(), 'public/images/portrait/portrait.webp')
  )
    .resize(260, 260)
    .jpeg({ quality: 85 })
    .toBuffer();

  const portraitDataUrl = `data:image/jpeg;base64,${portraitBuffer.toString('base64')}`;

  return renderOgCard({
    realm: 'arrakis',
    badge: ui.realms.arrakis,
    glyph: ogGlyph('arrakis'),
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <h1
            style={{
              fontSize: '60px',
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
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: 1.45,
              color: '#574E40',
              margin: 0,
            }}
          >
            {profile.bio[0]}
          </p>
        </div>

        {/* Portrait frame */}
        <div
          style={{
            display: 'flex',
            width: '260px',
            height: '260px',
            borderRadius: '2px',
            border: '2px solid #B8A88A',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitDataUrl}
            alt={profile.name}
            width={260}
            height={260}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    ),
  });
}
