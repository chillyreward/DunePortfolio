import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/schema';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

export interface CaseStudyLayoutProps {
  project: Project;
  nextProject?: Project | null;
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  return (
    <article className="flex flex-col w-full">
      {/* 1. Opening Band (Atreides Realm) */}
      <Realm name="atreides" className="py-12 md:py-20 border-b border-line">
        <Container>
          {/* Breadcrumb / Back link */}
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 t-meta text-ink-2 hover:text-ink transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Header & Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-8">
              <RealmMarker realm="atreides" className="mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <span className="t-meta text-xs font-mono uppercase text-mark">{project.type}</span>
                {project.year && (
                  <>
                    <span className="text-ink-2/40 text-xs">/</span>
                    <span className="t-meta text-xs font-mono text-ink-2">{project.year}</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="t-lead text-ink-2 max-w-2xl">
                {project.tagline}
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="primary" className="w-full sm:w-auto">
                  <span>Visit Live Product</span>
                  <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              )}
              {project.repoUrl && (
                <Button href={project.repoUrl} variant="ghost" className="w-full sm:w-auto">
                  <span>View Source Code</span>
                  <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>

          {/* Structured metadata details */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-line text-xs font-mono mb-12">
            {project.role && (
              <div>
                <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-1">Role</dt>
                <dd className="text-ink font-sans font-medium text-sm">{project.role}</dd>
              </div>
            )}
            {project.team && project.team.length > 0 && (
              <div>
                <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-1">Team</dt>
                <dd className="text-ink font-sans font-medium text-sm">{project.team.join(', ')}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-1">Timeline</dt>
                <dd className="text-ink font-sans font-medium text-sm">{project.year}</dd>
              </div>
            )}
            {project.stack && project.stack.length > 0 && (
              <div className="col-span-2 md:col-span-1">
                <dt className="text-ink-2 uppercase tracking-wider text-[11px] mb-1">Stack</dt>
                <dd className="flex flex-wrap gap-1">
                  {project.stack.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded text-[11px] bg-ink/5 text-ink">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          {/* Main Cover Image */}
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line bg-surface/40">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-top"
            />
          </div>
        </Container>
      </Realm>

      {/* 2. Reading Body (Arrakis Realm) */}
      <Realm name="arrakis" className="py-16 md:py-24 border-b border-line">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Project Summary */}
            <section aria-label="Project Summary">
              <h2 className="t-meta text-accent uppercase tracking-widest text-xs font-mono mb-3">Overview</h2>
              <p className="t-lead text-ink leading-relaxed">
                {project.summary}
              </p>
            </section>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section aria-label="Key Highlights" className="p-8 rounded-lg border border-line bg-surface/20">
                <h2 className="t-h3 text-ink mb-6">Key Engineering & Product Highlights</h2>
                <ul className="space-y-4">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />
                      <span className="t-body text-ink font-medium leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Detailed Story / In-progress note */}
            <section aria-label="Case Study Narrative">
              <h2 className="t-h3 text-ink mb-6">Architecture & Engineering Decisions</h2>
              {project.story && project.story.length > 0 ? (
                <div className="space-y-6">
                  {project.story.map((para, i) => (
                    <p key={i} className="t-body text-ink-2 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded border border-line/60 bg-surface/30">
                  <p className="t-body text-ink-2 italic">
                    Case study narrative documentation in progress. Technical architecture highlights, verified repository links, and production captures are available above.
                  </p>
                </div>
              )}
            </section>

            {/* Gallery Artifacts */}
            {project.gallery && project.gallery.length > 0 && (
              <section aria-label="Visual Gallery" className="space-y-12 pt-8">
                <h2 className="t-h3 text-ink">Interface Captures & Walkthrough</h2>
                <div className="space-y-12">
                  {project.gallery.map((imgItem, i) => (
                    <figure key={i} className="space-y-3">
                      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line bg-surface/40">
                        <Image
                          src={imgItem.src}
                          alt={imgItem.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 768px"
                          className="object-cover object-top"
                        />
                      </div>
                      <figcaption className="t-meta text-ink-2 text-xs font-mono text-center">
                        {imgItem.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Container>
      </Realm>

      {/* 3. Next Project Band (Atreides Realm) */}
      <Realm name="atreides" className="py-16 md:py-24">
        <Container>
          {nextProject ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-lg border border-line bg-surface/20">
              <div>
                <span className="t-meta text-xs font-mono text-ink-2 uppercase tracking-wider block mb-1">
                  Next Project
                </span>
                <h3 className="t-h2 text-ink">{nextProject.title}</h3>
                <p className="t-body text-ink-2 mt-1">{nextProject.tagline}</p>
              </div>
              <Button href={`/work/${nextProject.slug}`} variant="primary" className="shrink-0">
                <span>View Next Project</span>
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Button href="/work" variant="ghost">
                Back to All Projects →
              </Button>
            </div>
          )}
        </Container>
      </Realm>
    </article>
  );
}
