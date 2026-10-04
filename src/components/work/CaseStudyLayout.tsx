import React from 'react';
import Image from 'next/image';
import { Project } from '@/content/schema';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { ui } from '@/content/ui';
import { realmFor } from '@/content/projects';
import { ExternalLink } from 'lucide-react';
import { ProjectCover } from './ProjectCover';
import { CaseStudyToc } from './CaseStudyToc';
import { caseStudyToc, gallery } from '@/content/interactions';

export interface CaseStudyLayoutProps {
  project: Project;
  nextProject?: Project | null;
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  const realm = realmFor(project);
  const hasContributions = !!project.contributions && project.contributions.length > 0;
  const hasStory = !!project.story && project.story.length > 0;
  const tocEntries = [
    { id: 'overview', label: ui.project.overview },
    ...(hasContributions ? [{ id: 'contributions', label: ui.project.contributions }] : []),
    ...(project.highlights.length > 0 ? [{ id: 'features', label: ui.project.features }] : []),
    ...(hasStory ? [{ id: 'story', label: ui.project.story }] : []),
    ...(project.gallery.length > 0 ? [{ id: 'screens', label: ui.project.gallery }] : []),
  ];

  return (
    <article className="flex flex-col w-full">
      {/* 1. Opening band */}
      <Realm name={realm} className="py-12 md:py-20 border-b border-line">
        <Container>
          <div className="mb-8">
            <TextLink href="/work" className="t-small inline-flex items-center min-h-11">
              {ui.project.allWork}
            </TextLink>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <RealmMarker realm={realm} className="mb-4" />
              <p className="t-meta mb-3">
                {ui.projectTypes[project.type]}
                {project.year && <> · {project.year}</>}
              </p>
              <h1 className="t-h1 text-ink mb-4" style={{ fontSize: 'clamp(26px, 8.4vw, 104px)' }}>
                {project.title}
              </h1>
              <p className="t-body text-ink-2">{project.tagline}</p>
              {project.credit && <p className="t-small text-ink-2 mt-3">{project.credit}</p>}
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="primary">
                  {ui.project.visit}
                  <ExternalLink aria-hidden="true" />
                </Button>
              )}
              {project.repoUrl && (
                <Button href={project.repoUrl} variant="ghost">
                  {ui.project.source}
                  <ExternalLink aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>

          {(project.role || (project.team && project.team.length > 0) || project.year || project.stack.length > 0) && (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-line mb-12">
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
              {project.year && (
                <div>
                  <dt className="t-meta">{ui.project.year}</dt>
                  <dd className="t-small text-ink">{project.year}</dd>
                </div>
              )}
              {project.stack.length > 0 && (
                <div className="col-span-2 md:col-span-1">
                  <dt className="t-meta">{ui.project.stack}</dt>
                  <dd className="t-small text-ink">{project.stack.join(', ')}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="relative w-full aspect-[16/10] overflow-hidden rounded bg-surface">
            <ProjectCover project={project} priority sizes="(max-width: 1440px) 100vw, 1440px" />
          </div>
        </Container>
      </Realm>

      {/* 2. Reading body */}
      <Realm name="arrakis" className="py-section border-b border-line">
        <Container className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <CaseStudyToc label={caseStudyToc.label} entries={tocEntries} />
          </div>
          <div className="lg:col-span-8 max-w-3xl space-y-16">
            <section id="overview" aria-labelledby="cs-overview">
              <h2 id="cs-overview" className="t-h3 text-ink mb-4">{ui.project.overview}</h2>
              <p className="t-body text-ink">{project.summary}</p>
            </section>

            {hasContributions && (
              <section id="contributions" aria-labelledby="cs-contributions">
                <h2 id="cs-contributions" className="t-h3 text-ink mb-4">{ui.project.contributions}</h2>
                {project.role && <p className="t-meta mb-2">{project.role}</p>}
                <ul className="border-t border-line">
                  {project.contributions!.map((c) => (
                    <li key={c} className="t-body max-w-none text-ink border-b border-line py-4">
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.highlights.length > 0 && (
              <section id="features" aria-labelledby="cs-features">
                <h2 id="cs-features" className="t-h3 text-ink mb-4">{ui.project.features}</h2>
                <ul className="border-t border-line">
                  {project.highlights.map((h) => (
                    <li key={h} className="t-body max-w-none text-ink border-b border-line py-4">
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasStory && (
              <section id="story" aria-labelledby="cs-story">
                <h2 id="cs-story" className="t-h3 text-ink mb-4">{ui.project.story}</h2>
                <div className="space-y-6">
                  {project.story!.map((para, i) => (
                    <p key={i} className="t-body text-ink-2">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {project.gallery.length > 0 && (
              <section id="screens" aria-labelledby="cs-gallery">
                <h2 id="cs-gallery" className="t-h3 text-ink mb-8">{ui.project.gallery}</h2>
                {/* Mobile: a horizontal scroll-snap strip. md+: stacked. */}
                <div
                  role="region"
                  aria-labelledby="cs-gallery"
                  tabIndex={0}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-gutter px-gutter scroll-px-gutter md:block md:overflow-visible md:mx-0 md:px-0 md:space-y-12"
                >
                  {project.gallery.map((imgItem, i) => (
                    <figure key={imgItem.src} className="snap-start shrink-0 w-[85%] md:w-full">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded bg-surface">
                        <Image
                          src={imgItem.src}
                          alt={imgItem.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 768px"
                          // Phone-shaped captures are shown whole inside the same frame;
                          // very tall full-page captures crop to their top like the rest.
                          className={
                            imgItem.height > imgItem.width && imgItem.height < imgItem.width * 3
                              ? 'object-contain'
                              : 'object-cover object-top'
                          }
                        />
                      </div>
                      <figcaption className="t-meta mt-3">
                        {i + 1} {gallery.of} {project.gallery.length} · {imgItem.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Container>
      </Realm>

      {/* 3. Next project */}
      <Realm name={realm} className="py-16 md:py-24">
        <Container>
          {nextProject ? (
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="t-meta mb-2">{ui.project.next}</p>
                <h2 className="t-h2 text-ink">{nextProject.title}</h2>
                <p className="t-body text-ink-2 mt-2">{nextProject.tagline}</p>
              </div>
              <Button href={`/work/${nextProject.slug}`} variant="ghost" className="shrink-0">
                {ui.project.caseStudy}
              </Button>
            </div>
          ) : (
            <Button href="/work" variant="ghost">
              {ui.project.allWork}
            </Button>
          )}
        </Container>
      </Realm>
    </article>
  );
}
