import React from 'react';
import Image from 'next/image';
import type { Project } from '@/content/schema';

export interface ProjectCoverProps {
  project: Project;
  sizes: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
}

// The project's screenshot, or, until a real one exists, an empty surface frame
// with the site's address (brief §4: --surface is the image-placeholder token).
export function ProjectCover({ project, sizes, priority, loading }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }

  const host = project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface">
      {host && <span className="t-meta">{host}</span>}
    </div>
  );
}
