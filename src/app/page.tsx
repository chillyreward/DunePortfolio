import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';
import { Button } from '@/components/ui/Button';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { Hero } from '@/components/home/Hero';
import { ProjectRow } from '@/components/work/ProjectRow';
import { HackathonTimeline } from '@/components/hackathons/HackathonTimeline';
import { ContactForm } from '@/components/contact/ContactForm';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { skillGroups } from '@/content/skills';
import { homePage } from '@/content/home';
import { contact } from '@/content/contact';
import { getEpigraph } from '@/content/epigraphs';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const selectedProjects = homePage.selectedWork.projectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const homeEpigraph = getEpigraph('home-about');

  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = rawUrl && !rawUrl.includes('localhost') ? rawUrl : 'https://lennydev.vercel.app';
  const allSkills = skillGroups.flatMap((g) => g.skills);
  const sameAs = [
    profile.contact.github,
    profile.contact.linkedin,
    profile.contact.fiverr,
    profile.contact.x,
  ].filter(Boolean);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.alias,
    jobTitle: profile.title,
    url: siteUrl,
    sameAs,
    knowsAbout: allSkills,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: profile.education.institution,
    },
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* 1. Hero Section (Arrakis) */}
      <Realm name="arrakis">
        <Hero />
      </Realm>

      {/* 2. Selected Work Section (Atreides Realm Band) */}
      <Realm name="atreides" id="work" className="py-20 md:py-28 border-b border-line">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line">
            <div>
              <RealmMarker realm="atreides" className="mb-4" />
              <h2 className="t-h2 text-ink">{homePage.selectedWork.heading}</h2>
              <p className="t-body text-ink-2 max-w-xl mt-2">
                {homePage.selectedWork.lead}
              </p>
            </div>
            <div>
              <Button href="/work" variant="ghost" className="text-[15px]">
                <span>All Projects</span>
                <span aria-hidden="true" className="ml-1">({projects.length}) →</span>
              </Button>
            </div>
          </div>

          {/* Project Rows */}
          <div className="flex flex-col">
            {selectedProjects.map((project, idx) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={idx}
                featured={idx === 0}
              />
            ))}
          </div>

          {/* Bottom link to all work */}
          <div className="pt-12 text-center">
            <Button href="/work" variant="ghost">
              View All {projects.length} Projects & Experiments →
            </Button>
          </div>
        </Container>
      </Realm>

      {/* 3. Hackathons Section (Fremen Realm Band) */}
      <Realm name="fremen" id="hackathons" className="py-20 md:py-28 border-b border-line">
        <Container>
          {/* Section Header */}
          <div className="pb-12 border-b border-line">
            <RealmMarker realm="fremen" className="mb-4" />
            <h2 className="t-h2 text-ink">{homePage.hackathons.heading}</h2>
            <p className="t-body text-ink-2 max-w-xl mt-2">
              {homePage.hackathons.lead}
            </p>
          </div>

          {/* Hackathon Timeline */}
          <div className="pt-12">
            <HackathonTimeline variant="compact" />
          </div>
        </Container>
      </Realm>

      {/* 4. About Teaser (Arrakis) */}
      <Realm name="arrakis" className="py-20 md:py-28 border-b border-line">
        <Container>
          {/* Optional Dune Epigraph Slot */}
          {homeEpigraph && (
            <div className="mb-16 py-8 border-y border-line/60">
              <blockquote className="t-lead italic text-ink max-w-2xl">
                “{homeEpigraph.quote}”
                <cite className="block t-meta text-xs uppercase tracking-wider text-ink-2 not-italic mt-3">
                  — {homeEpigraph.attribution}
                </cite>
              </blockquote>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: About Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full max-w-md mx-auto rounded overflow-hidden border border-line bg-surface/30">
                <Image
                  src={profile.portraitAbout.src}
                  alt={profile.portraitAbout.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Teaser content */}
            <div className="lg:col-span-7">
              <span className="t-meta text-accent uppercase tracking-widest text-xs font-mono mb-2 block">
                Background & Education
              </span>
              <h2 className="t-h2 text-ink mb-6">{homePage.aboutTeaser.heading}</h2>
              <div className="space-y-4 t-body text-ink-2 mb-8 leading-relaxed">
                <p>
                  I am a Computer Science student at Catholic University of Eastern Africa (CUEA) in Nairobi,
                  focused on practical full-stack product engineering and advancing into applied machine learning.
                </p>
                <p>
                  From winning the U.S. Embassy Kenya Hackathon with SmartChama to shipping production client platforms
                  and trade marketplaces, I prioritize robust architectures, typed systems, and measurable real-world utility.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/about" variant="primary">
                  {homePage.aboutTeaser.cta} →
                </Button>
                {profile.cvPath && (
                  <Button href={profile.cvPath} download variant="ghost">
                    Download CV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Realm>

      {/* 5. Contact Section (Arrakis) */}
      <Realm name="arrakis" id="contact" className="py-20 md:py-32">
        <Container>
          <Grid className="gap-12 lg:gap-16 items-start">
            {/* Cols 1–5: Direct contact info & channels */}
            <div className="col-span-4 md:col-span-5 space-y-8">
              <div>
                <span className="t-meta text-accent uppercase tracking-widest text-xs font-mono mb-3 block">
                  Direct Contact
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight mb-4">
                  Let&apos;s build something together.
                </h2>
                <p className="t-lead text-ink-2 text-base md:text-lg">
                  {homePage.contact.lead}
                </p>
                {profile.availability && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-surface/60 border border-line text-xs font-mono text-ink">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>{profile.availability}</span>
                  </div>
                )}
              </div>

              {/* Direct Email Display */}
              <div className="p-6 rounded-[2px] border border-line bg-surface/30">
                <p className="t-meta text-xs uppercase tracking-wider text-ink-2 mb-1.5 font-mono">Direct Email</p>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-xl sm:text-2xl font-bold text-accent hover:underline underline-offset-4 decoration-2 block truncate"
                >
                  {profile.contact.email}
                </a>
              </div>

              {/* Quick Links / Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={profile.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-[2px] border border-line hover:border-accent bg-surface/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-ink-2 block">Quick Chat</span>
                    <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">WhatsApp</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-2 group-hover:text-accent transition-colors" aria-hidden="true" />
                </a>

                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-[2px] border border-line hover:border-accent bg-surface/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-ink-2 block">Network</span>
                    <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-2 group-hover:text-accent transition-colors" aria-hidden="true" />
                </a>

                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-[2px] border border-line hover:border-accent bg-surface/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-ink-2 block">Code</span>
                    <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-2 group-hover:text-accent transition-colors" aria-hidden="true" />
                </a>

                <a
                  href={profile.contact.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-[2px] border border-line hover:border-accent bg-surface/20 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono text-ink-2 block">Reviews</span>
                    <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">Fiverr</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-2 group-hover:text-accent transition-colors" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Cols 7–12: Contact form */}
            <div className="col-span-4 md:col-start-7 md:col-span-6 space-y-6 pt-8 md:pt-0 border-t md:border-t-0 border-line">
              <h3 className="t-h3 text-ink">{contact.formHeading}</h3>
              <ContactForm {...contact} fallbackEmail={profile.contact.email} />
            </div>
          </Grid>
        </Container>
      </Realm>
    </div>
  );
}
