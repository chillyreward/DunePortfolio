import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Realm } from '@/components/realm/Realm';
import { ImperialRule } from '@/components/realm/ImperialRule';
import { PrintButton } from '@/components/cv/PrintButton';
import { profile } from '@/content/profile';
import { getProjects } from '@/content/projects';
import { hackathons } from '@/content/hackathons';
import { skillGroups } from '@/content/skills';
import { cv } from '@/content/cv';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CV',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CvPage() {
  const visibleProjects = getProjects({ visibility: 'production' });

  const shippedSkills =
    skillGroups.find((g) => g.id === 'shipped')?.skills || [];
  const learningSkills =
    skillGroups.find((g) => g.id === 'learning')?.skills || [];

  const githubHost = profile.contact.github.replace(/^https?:\/\//, '');
  const linkedinHost = profile.contact.linkedin.replace(/^https?:\/\//, '');
  const fiverrHost = profile.contact.fiverr.replace(/^https?:\/\//, '');

  return (
    <Realm name="corrino" className="min-h-screen py-10 md:py-16">
      <Container>
        {/* Top actions: Download & Print (hidden on print) */}
        <div className="max-w-[820px] mx-auto flex items-center justify-between pb-8 print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-ink font-semibold">
              Curriculum Vitae
            </span>
            <span className="text-xs font-mono text-ink-2">
              (A4 Print Optimised)
            </span>
          </div>

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

        {/* CV Document Container */}
        <article className="max-w-[820px] mx-auto bg-surface/30 p-8 sm:p-12 md:p-16 border border-line rounded-[2px] space-y-8 print:space-y-3.5 font-sans">
          {/* 1. Header */}
          <header className="cv-entry space-y-3 print:space-y-1">
            <h1 className="t-h2 cv-name text-ink font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="text-base text-ink font-medium leading-snug">
              {profile.positioning}
            </p>

            <div className="pt-2 text-xs font-mono text-ink-2 flex flex-wrap gap-x-3 gap-y-1 items-center">
              <span>{profile.education.location}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${profile.contact.email}`} className="text-ink hover:underline">
                {profile.contact.email}
              </a>
              <span aria-hidden="true">·</span>
              <span>{cv.phoneDisplay}</span>
              <span aria-hidden="true">·</span>
              <a href={profile.contact.github} className="text-ink hover:underline">
                {githubHost}
              </a>
              <span aria-hidden="true">·</span>
              <a href={profile.contact.linkedin} className="text-ink hover:underline">
                {linkedinHost}
              </a>
            </div>
          </header>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 2. Summary */}
          <section className="cv-entry space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              Summary
            </h2>
            <p className="text-sm text-ink-2 leading-relaxed">
              {cv.summary}
            </p>
          </section>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 3. Education */}
          <section className="cv-entry space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              {cv.headings.education}
            </h2>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-semibold text-ink text-sm">
                  {profile.education.institution}
                </span>
                <span className="text-xs font-mono text-ink-2">
                  {profile.education.period} (expected)
                </span>
              </div>
              <p className="text-sm text-ink-2 font-medium">
                {profile.education.degree}
              </p>
              <p className="text-xs font-mono text-ink-2">
                {profile.education.location}
              </p>
            </div>
          </section>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 4. Projects */}
          <section className="space-y-6 print:space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              {cv.headings.projects}
            </h2>

            <div className="space-y-6 print:space-y-2">
              {visibleProjects.map((p) => {
                const liveHost = p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, '') : null;
                const typeLabel = p.type === 'product' ? 'Product' : 'Client Work';

                return (
                  <div key={p.slug} className="cv-entry space-y-1.5 print:space-y-0.5 border-b border-line/40 pb-5 print:pb-2 last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-ink">
                        {p.title}{' '}
                        <span className="text-xs font-mono font-normal text-ink-2">
                          ({typeLabel}{p.year ? ` · ${p.year}` : ''})
                        </span>
                      </h3>
                      {liveHost && (
                        <a
                          href={p.liveUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-accent hover:underline"
                        >
                          {liveHost}
                        </a>
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-ink-2 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="text-[11px] font-mono text-ink-2 space-y-0.5 pt-1 print:pt-0">
                      {p.role && <p><span className="text-ink font-medium">Role:</span> {p.role}</p>}
                      {p.stack && p.stack.length > 0 && (
                        <p><span className="text-ink font-medium">Stack:</span> {p.stack.join(', ')}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 5. Hackathons */}
          <section className="space-y-6 print:space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              {cv.headings.hackathons}
            </h2>

            <div className="space-y-5 print:space-y-2">
              {hackathons.map((h) => (
                <div key={h.id} className="cv-entry space-y-1 print:space-y-0.5 border-b border-line/40 pb-4 print:pb-2 last:border-b-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-ink">
                      {h.placement} — {h.name}
                    </h3>
                    <span className="text-xs font-mono text-ink-2">
                      {h.date} · {h.location}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-ink-2">
                    Organized by {h.organizer}{h.prize ? ` · Prize: ${h.prize}` : ''}
                  </p>
                  <p className="text-xs md:text-sm text-ink-2 leading-relaxed">
                    {h.summary}
                  </p>
                  <p className="text-[11px] font-mono text-ink-2 pt-0.5 print:pt-0">
                    <span className="text-ink font-medium">Built:</span> {h.project}
                    {h.team && h.team.length > 0 && ` · Team: ${h.team.join(', ')}`}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 6. Skills */}
          <section className="cv-entry space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              {cv.headings.skills}
            </h2>

            <div className="text-xs space-y-1.5">
              {shippedSkills.length > 0 && (
                <p>
                  <span className="font-bold text-ink font-mono">{cv.skillLabels.shipped}:</span>{' '}
                  <span className="text-ink-2 font-mono">{shippedSkills.join(', ')}</span>
                </p>
              )}
              {learningSkills.length > 0 && (
                <p>
                  <span className="font-bold text-ink font-mono">{cv.skillLabels.learning}:</span>{' '}
                  <span className="text-ink-2 font-mono">{learningSkills.join(', ')}</span>
                </p>
              )}
            </div>
          </section>

          <ImperialRule realm="corrino" className="opacity-60 print:hidden" />

          {/* 7. Links */}
          <section className="cv-entry space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-bold cv-heading">
              {cv.headings.links}
            </h2>
            <div className="text-xs font-mono text-ink-2 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                Portfolio: <a href="https://lennydev.vercel.app" className="text-ink hover:underline">lennydev.vercel.app</a>
              </span>
              <span>
                Fiverr: <a href={profile.contact.fiverr} className="text-ink hover:underline">{fiverrHost}</a>
              </span>
              <span>
                GitHub: <a href={profile.contact.github} className="text-ink hover:underline">{githubHost}</a>
              </span>
              <span>
                LinkedIn: <a href={profile.contact.linkedin} className="text-ink hover:underline">{linkedinHost}</a>
              </span>
            </div>
          </section>
        </article>
      </Container>
    </Realm>
  );
}
