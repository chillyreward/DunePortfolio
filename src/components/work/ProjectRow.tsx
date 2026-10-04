import React from 'react';
import Link from 'next/link';
import { Project } from '@/content/schema';
import { TextLink } from '@/components/ui/TextLink';
import { ProjectCover } from './ProjectCover';
import { ui } from '@/content/ui';
import { cn } from '@/lib/cn';
import { ExternalLink } from 'lucide-react';

export interface ProjectRowProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const isEven = index % 2 === 0;
  const hasCaseStudy = project.permission && project.publish;
  const cover = <ProjectCover project={project} sizes="(max-width: 1024px) 100vw, 58vw" />;

  return (
    <article
      data-project-slug={project.slug}
      data-project-type={project.type}
      className="border-b border-line py-16 md:py-24 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Screenshot */}
        <div className={cn('lg:col-span-7 relative w-full overflow-hidden rounded bg-surface', !isEven && 'lg:order-2')}>
          <div className="relative aspect-[16/10] w-full">
            {hasCaseStudy ? (
              <Link href={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block w-full h-full">
                {cover}
              </Link>
            ) : (
              cover
            )}
          </div>
        </div>

        {/* Text */}
        <div className={cn('lg:col-span-5 flex flex-col', !isEven && 'lg:order-1')}>
          <p className="t-meta mb-3">
            {ui.projectTypes[project.type]}
            {project.year && <> · {project.year}</>}
          </p>

          <h2 className="t-h2 text-ink mb-3">
            {hasCaseStudy ? (
              <Link href={`/work/${project.slug}`} className="hover:text-accent transition-colors">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h2>

          <p className="t-body text-ink-2 mb-6">{project.tagline}</p>

          {/* Metadata: separate labelled cells */}
          {(project.role || (project.team && project.team.length > 0) || project.stack.length > 0) && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 py-5 mb-6 border-y border-line">
              {project.role && (
                <div>
                  <dt className="t-meta">{ui.project.role}</dt>
                  <dd className="t-small text-ink">{project.role}</dd>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div>
                  <dt className="t-meta">{ui.project.team}</dt>
                  <dd className="t-small text-ink">{project.team.join(', ')}</dd>
                </div>
              )}
              {project.stack.length > 0 && (
                <div className="col-span-2">
                  <dt className="t-meta">{ui.project.stack}</dt>
                  <dd className="t-small text-ink">{project.stack.join(', ')}</dd>
                </div>
              )}
            </dl>
          )}

          <p className="t-small text-ink-2 mb-6">{project.summary}</p>

          <div className="flex flex-wrap items-center gap-x-8">
            {hasCaseStudy && (
              <TextLink href={`/work/${project.slug}`} className="t-small font-medium inline-flex items-center min-h-11">
                {ui.project.caseStudy}
              </TextLink>
            )}
            {project.liveUrl && (
              <TextLink href={project.liveUrl} className="t-small inline-flex items-center gap-1.5 min-h-11">
                {ui.project.visit}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </TextLink>
            )}
            {project.repoUrl && (
              <TextLink href={project.repoUrl} className="t-small inline-flex items-center gap-1.5 min-h-11">
                {ui.project.source}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
