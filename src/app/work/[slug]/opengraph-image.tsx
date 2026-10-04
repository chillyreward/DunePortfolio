import React from 'react';
import { ogSize, ogContentType, renderOgCard, ogGlyph, realmColors, OgRealm } from '@/lib/og';
import { ui } from '@/content/ui';
import { getProjectBySlug, getProjects, realmFor } from '@/content/projects';

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
      children: <h1 style={{ fontSize: '64px', fontWeight: 800, color: realmColors.arrakis.ink }}>{ui.project.allWork}</h1>,
    });
  }

  const realm: OgRealm = realmFor(project);
  const c = realmColors[realm];

  return renderOgCard({
    realm,
    badge: ui.realms[realm],
    glyph: ogGlyph(realm),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <span style={{ fontSize: '20px', fontWeight: 600, color: c.ink2 }}>
          {ui.projectTypes[project.type]}
          {project.year ? ` · ${project.year}` : ''}
          {project.role ? ` · ${project.role}` : ''}
        </span>

        <h1
          style={{
            fontSize: '72px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: 0,
            color: c.ink,
          }}
        >
          {project.title}
        </h1>

        <p style={{ fontSize: '24px', fontWeight: 400, lineHeight: 1.4, color: c.ink2, maxWidth: '960px', margin: 0 }}>
          {project.tagline}
        </p>

        {project.stack.length > 0 && (
          <p style={{ fontSize: '18px', fontWeight: 400, color: c.ink2, margin: 0 }}>
            {project.stack.slice(0, 6).join(', ')}
          </p>
        )}
      </div>
    ),
  });
}
