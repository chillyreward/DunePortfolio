import React from 'react';
import { ogSize, ogContentType, renderOgCard, OgRealm } from '@/lib/og';
import { getProjectBySlug, getProjects } from '@/content/projects';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const projects = getProjects({ visibility: 'production' });
  return projects.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return renderOgCard({
      realm: 'arrakis',
      badge: 'Project',
      children: (
        <h1 style={{ fontSize: '64px', fontWeight: 800, color: '#231D14' }}>
          Project Not Found
        </h1>
      ),
    });
  }

  const isProduct = project.type === 'product';
  const realm: OgRealm = isProduct ? 'atreides' : 'corrino';

  const atreidesGlyph = (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11 12 4l8 7" />
      <path d="M5 17l7-6 7 6" />
      <path d="M12 2v3" />
    </svg>
  );

  const corrinoGlyph = (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#A67608" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l-1-5 4 2 4-6 4 6 4-2-1 5" />
      <circle cx="12" cy="16" r="4.5" />
      <circle cx="12" cy="16" r="1.5" fill="#A67608" stroke="none" />
    </svg>
  );

  const inkColor = isProduct ? '#F0F2EE' : '#1C1824';
  const metaColor = isProduct ? '#A0ACA5' : '#5A5264';
  const pillBg = isProduct ? '#202C26' : '#E8E1D2';
  const pillBorder = isProduct ? '#2D3D35' : '#D5CBB8';

  return renderOgCard({
    realm,
    badge: isProduct ? 'Atreides / Product' : 'Corrino / Client Work',
    glyph: isProduct ? atreidesGlyph : corrinoGlyph,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: isProduct ? '#80A892' : '#7B52A8',
            }}
          >
            {isProduct ? 'Product' : 'Client Work'}
            {project.year ? ` · ${project.year}` : ''}
          </span>
          {project.role && (
            <span
              style={{
                fontSize: '18px',
                fontWeight: 500,
                color: metaColor,
              }}
            >
              Role: {project.role}
            </span>
          )}
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
            color: inkColor,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.4,
            color: metaColor,
            maxWidth: '960px',
            margin: 0,
          }}
        >
          {project.summary}
        </p>

        {project.stack && project.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
            {project.stack.slice(0, 5).map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '6px 14px',
                  backgroundColor: pillBg,
                  border: `1px solid ${pillBorder}`,
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: inkColor,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  });
}
