import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Realm } from '@/components/realm/Realm';
import { RealmGlyph } from '@/components/realm/RealmGlyph';
import { PrintButton } from '@/components/cv/PrintButton';
import { ProjectCover } from '@/components/work/ProjectCover';
import { profile } from '@/content/profile';
import { getProjects, realmFor } from '@/content/projects';
import { hackathons } from '@/content/hackathons';
import { skillGroups } from '@/content/skills';
import { cv } from '@/content/cv';
import { ui } from '@/content/ui';
import type { RealmName } from '@/design/tokens';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CV',
  robots: {
    index: false,
    follow: false,
  },
};

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Section heading: realm glyph in that realm's mark colour, gold rule underneath.
function CvHeading({ realm, children }: { realm: RealmName; children: React.ReactNode }) {
  return (
    <h2 className="cv-heading flex items-center gap-2 border-b border-mark/50 pb-1.5 text-[15px] font-semibold text-ink">
      <span data-realm={realm} className="inline-flex">
        <RealmGlyph realm={realm} size={14} className="text-mark" />
      </span>
      {children}
    </h2>
  );
}

export default function CvPage() {
  const visibleProjects = getProjects({ visibility: 'production' });
  const contactLinks = [
    { href: `mailto:${profile.contact.email}`, label: profile.contact.email },
    { href: profile.contact.whatsapp, label: cv.whatsapp },
    { href: profile.contact.github, label: host(profile.contact.github) },
    { href: profile.contact.linkedin, label: host(profile.contact.linkedin) },
  ];
  const links = [
    { label: cv.labels.portfolio, href: cv.portfolioUrl },
    { label: cv.labels.github, href: profile.contact.github },
    { label: cv.labels.linkedin, href: profile.contact.linkedin },
    { label: cv.labels.fiverr, href: profile.contact.fiverr },
  ];

  return (
    <Realm name="corrino" className="min-h-screen py-10 md:py-16">
      <Container>
        {/* Top actions: Download & Print (hidden on print) */}
        <div className="max-w-[820px] mx-auto flex flex-wrap items-center justify-between gap-4 pb-8 print:hidden">
          <p className="flex items-baseline gap-3">
            <span className="text-[15px] font-semibold text-ink">{cv.pageLabel}</span>
            <span className="t-meta">{cv.pageNote}</span>
          </p>

          <div className="flex items-center gap-3">
            <Button
              href={profile.cvPath || '/documents/lenny-kidavi-cv.pdf'}
              download={cv.downloadFileName}
              variant="primary"
              className="text-[15px]"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>{cv.download}</span>
            </Button>
            <PrintButton label={cv.print} />
          </div>
        </div>

        {/* CV document */}
        <article className="cv-sheet max-w-[820px] mx-auto bg-bg border border-line rounded-[2px] font-sans">
          {/* 1. Header band: parchment surface, monochrome portrait */}
          <header className="cv-entry cv-band flex items-start justify-between gap-6 bg-surface border-b-2 border-double border-mark p-8 sm:p-12 print:px-6 print:py-5">
            <div className="min-w-0 space-y-3 print:space-y-1.5">
              <h1 className="t-h2 cv-name text-ink">{profile.name}</h1>
              <p className="text-base text-ink font-medium leading-snug max-w-[46ch]">{profile.positioning}</p>
              <p className="text-xs text-ink-2">{profile.education.location}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {contactLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-accent underline underline-offset-2 decoration-1">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cv-portrait relative shrink-0 w-[88px] sm:w-[112px] aspect-[4/5] overflow-hidden rounded-[2px] border border-mark/40">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="112px"
                loading="eager"
                className="object-cover object-top grayscale"
              />
            </div>
          </header>

          <div className="space-y-8 p-8 sm:p-12 print:space-y-3 print:px-6 print:pt-4 print:pb-0">
            {/* 2. Summary */}
            <section className="cv-entry space-y-2">
              <CvHeading realm="arrakis">{cv.headings.summary}</CvHeading>
              <p className="text-sm text-ink-2 leading-relaxed">{cv.summary}</p>
            </section>

            {/* 3. Experience */}
            <section className="space-y-3 print:space-y-1.5">
              <CvHeading realm="arrakis">{cv.headings.experience}</CvHeading>
              {cv.experience.map((e) => (
                <div key={e.role} className="cv-entry space-y-1.5 print:space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-ink">
                      {e.role}{' '}
                      <span className="text-xs font-normal text-ink-2">
                        {e.org} · {e.location}
                      </span>
                    </h3>
                    <span className="text-xs text-ink-2">{e.period}</span>
                  </div>
                  <ul className="list-disc pl-4 marker:text-mark space-y-1 print:space-y-0 text-xs md:text-sm text-ink-2 leading-relaxed">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* 4. Education */}
            <section className="cv-entry space-y-3 print:space-y-1">
              <CvHeading realm="arrakis">{cv.headings.education}</CvHeading>
              <div className="space-y-1 print:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="font-semibold text-ink text-sm">{profile.education.institution}</span>
                  <span className="text-xs text-ink-2">
                    {profile.education.period} ({cv.labels.expected})
                  </span>
                </div>
                <p className="text-sm text-ink-2 font-medium">
                  {profile.education.degree} · {profile.education.location}
                </p>
              </div>
            </section>

            {/* 5. Projects: screenshot thumbnail beside each */}
            <section className="space-y-5 print:space-y-2">
              <CvHeading realm="atreides">{cv.headings.projects}</CvHeading>

              <div className="space-y-5 print:space-y-2">
                {visibleProjects.map((p) => {
                  const realm = realmFor(p);
                  return (
                    <div
                      key={p.slug}
                      className="cv-entry grid grid-cols-[96px_1fr] sm:grid-cols-[136px_1fr] print:grid-cols-[30mm_1fr] gap-4 print:gap-3 border-b border-line pb-5 print:pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-line bg-surface">
                        <ProjectCover project={p} sizes="136px" loading="eager" />
                      </div>
                      <div className="min-w-0 space-y-1 print:space-y-0.5">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-3 gap-y-0.5">
                          <h3 className="text-sm font-bold text-ink">
                            {p.title}{' '}
                            <span className="inline-flex items-center gap-1 text-xs font-normal text-ink-2">
                              <span data-realm={realm} className="inline-flex">
                                <RealmGlyph realm={realm} size={11} className="text-mark" />
                              </span>
                              {ui.projectTypes[p.type]}
                              {p.year ? ` · ${p.year}` : ''}
                            </span>
                          </h3>
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-accent underline underline-offset-2 decoration-1 break-all"
                            >
                              {host(p.liveUrl)}
                            </a>
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-ink-2 leading-relaxed">{p.summary}</p>
                        <div className="text-[11px] text-ink-2 space-y-0.5 print:space-y-0">
                          {p.role && (
                            <p>
                              <span className="text-ink font-medium">{cv.labels.role}:</span> {p.role}
                            </p>
                          )}
                          {p.stack && p.stack.length > 0 && (
                            <p>
                              <span className="text-ink font-medium">{cv.labels.stack}:</span> {p.stack.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 6. Hackathons */}
            <section className="space-y-4 print:space-y-1.5">
              <CvHeading realm="fremen">{cv.headings.hackathons}</CvHeading>

              <div className="space-y-4 print:space-y-1.5">
                {hackathons.map((h) => (
                  <div key={h.id} className="cv-entry space-y-1 print:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-ink">
                        {h.placement} · {h.name}
                      </h3>
                      <span className="text-xs text-ink-2">
                        {h.date} · {h.location}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-ink-2 leading-relaxed">{h.summary}</p>
                    <p className="text-[11px] text-ink-2">
                      <span className="text-ink font-medium">{cv.labels.organiser}:</span> {h.organizer}
                      {h.prize && (
                        <>
                          {' · '}
                          <span className="text-ink font-medium">{cv.labels.prize}:</span> {h.prize}
                        </>
                      )}
                      {h.team && h.team.length > 0 && (
                        <>
                          {' · '}
                          <span className="text-ink font-medium">{cv.labels.team}:</span> {h.team.join(', ')}
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Skills: the three honest groups */}
            <section className="cv-entry space-y-3 print:space-y-1">
              <CvHeading realm="arrakis">{cv.headings.skills}</CvHeading>
              <div className="text-xs space-y-1.5 print:space-y-0.5">
                {skillGroups
                  .filter((g) => g.skills.length > 0)
                  .map((g) => (
                    <p key={g.id}>
                      <span className="font-bold text-ink">{g.title}:</span>{' '}
                      <span className="text-ink-2">{g.skills.join(', ')}</span>
                    </p>
                  ))}
              </div>
            </section>

            {/* 8. Links */}
            <section className="cv-entry space-y-2 print:space-y-1 pb-0">
              <CvHeading realm="arrakis">{cv.headings.links}</CvHeading>
              <ul className="text-xs text-ink-2 flex flex-wrap gap-x-5 gap-y-1">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.label}:{' '}
                    <a href={l.href} className="text-accent underline underline-offset-2 decoration-1">
                      {host(l.href)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </Container>
    </Realm>
  );
}
