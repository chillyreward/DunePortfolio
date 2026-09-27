import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/schema';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';
import { ExternalLink } from 'lucide-react';

export interface ProjectRowProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectRow({ project, index, featured = false }: ProjectRowProps) {
  const isEven = index % 2 === 0;
  const hasCaseStudy = project.permission && project.publish;

  return (
    <article
      data-project-slug={project.slug}
      data-project-type={project.type}
      className={cn(
        'group border-b border-line py-16 md:py-24 transition-colors',
        featured && 'bg-surface/10'
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Visual / Screenshot column */}
        <div
          className={cn(
            'lg:col-span-7 relative w-full overflow-hidden rounded border border-line bg-surface/30',
            !isEven && 'lg:order-2'
          )}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {hasCaseStudy ? (
              <Link href={`/work/${project.slug}`} className="block w-full h-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-mark">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-mark"
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
            ) : (
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top"
              />
            )}
          </div>
        </div>

        {/* Content & Metadata column */}
        <div className={cn('lg:col-span-5 flex flex-col justify-between', !isEven && 'lg:order-1')}>
          <div>
            {/* Type badge + year */}
            <div className="flex items-center gap-3 mb-4">
              <span className="t-meta uppercase tracking-wider text-xs font-mono text-mark">
                {project.type}
              </span>
              {project.year && (
                <>
                  <span className="text-ink-2/40 text-xs">/</span>
                  <span className="t-meta text-xs font-mono text-ink-2">{project.year}</span>
                </>
              )}
            </div>

            {/* Project title */}
            <h2 className="t-h2 text-ink mb-3 group-hover:text-mark transition-colors">
              {hasCaseStudy ? (
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              ) : (
                project.title
              )}
            </h2>

            {/* Tagline */}
            <p className="text-base md:text-lg text-ink-2 mb-6 font-medium leading-relaxed">
              {project.tagline}
            </p>

            {/* Structured metadata <dl> */}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 my-4 border-y border-line text-xs font-mono">
              {project.role && (
                <div>
                  <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-0.5">Role</dt>
                  <dd className="text-ink font-sans font-medium text-xs">{project.role}</dd>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div>
                  <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-0.5">Team</dt>
                  <dd className="text-ink font-sans font-medium text-xs">{project.team.join(', ')}</dd>
                </div>
              )}
              {project.stack && project.stack.length > 0 && (
                <div className="col-span-2">
                  <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-1">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] bg-ink/5 text-ink font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            {/* Summary narrative */}
            <p className="text-sm text-ink-2 leading-relaxed mb-6">
              {project.summary}
            </p>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {hasCaseStudy && (
              <Link
                href={`/work/${project.slug}`}
                className="t-body font-semibold text-mark hover:underline underline-offset-4 decoration-1 inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mark"
              >
                Read Case Study <span aria-hidden="true">→</span>
              </Link>
            )}
            {project.liveUrl && (
              <TextLink
                href={project.liveUrl}
                className="t-body text-ink hover:text-mark inline-flex items-center gap-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 inline ml-0.5 opacity-70" aria-hidden="true" />
              </TextLink>
            )}
            {project.repoUrl && (
              <TextLink
                href={project.repoUrl}
                className="t-body text-ink-2 hover:text-ink inline-flex items-center gap-1"
              >
                <span>Source</span>
                <ExternalLink className="w-3.5 h-3.5 inline ml-0.5 opacity-70" aria-hidden="true" />
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
