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
import { getProjectBySlug, isVisible } from '@/content/projects';
import { skillGroups } from '@/content/skills';
import { homePage } from '@/content/home';
import { contact } from '@/content/contact';
import { getEpigraph } from '@/content/epigraphs';
import { getSiteUrl } from '@/lib/site-url';
import { Epigraph } from '@/components/ui/Epigraph';
import { TextLink } from '@/components/ui/TextLink';

export default function HomePage() {
  const selectedProjects = homePage.selectedWork.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined && isVisible(p));

  const homeEpigraph = getEpigraph('home-about');
  const socials = [
    { label: homePage.contact.socials.linkedin, href: profile.contact.linkedin },
    { label: homePage.contact.socials.github, href: profile.contact.github },
    { label: homePage.contact.socials.fiverr, href: profile.contact.fiverr },
    ...(profile.contact.x ? [{ label: homePage.contact.socials.x, href: profile.contact.x }] : []),
  ];
  const siteUrl = getSiteUrl();
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
                {homePage.selectedWork.allLink}
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
              {homePage.selectedWork.allLink}
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
      <Realm name="arrakis" className="py-24 md:py-36 border-b border-line">
        <Container>
          {homeEpigraph && (
            <Epigraph
              text={homeEpigraph.quote}
              attribution={homeEpigraph.attribution}
              className="max-w-2xl mb-20"
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded bg-surface">
                <Image
                  src={profile.portraitAbout.src}
                  alt={profile.portraitAbout.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="t-h2 text-ink mb-6">{homePage.aboutTeaser.heading}</h2>
              <p className="t-body text-ink mb-4">{homePage.hero.tagline}</p>
              <p className="t-meta mb-8">
                {profile.education.degree}, {profile.education.institution}, {profile.education.period}
              </p>
              <Button href="/about" variant="ghost">
                {homePage.aboutTeaser.cta}
              </Button>
            </div>
          </div>
        </Container>
      </Realm>

      {/* 5. Contact (Arrakis) */}
      <Realm name="arrakis" id="contact" className="py-24 md:py-36">
        <Container>
          <Grid className="gap-16 lg:gap-16 items-start">
            <div className="col-span-4 md:col-span-6">
              <h2 className="t-h2 text-ink mb-4">{homePage.contact.heading}</h2>
              <p className="t-body text-ink-2 mb-10">{profile.availability}</p>

              <a
                href={`mailto:${profile.contact.email}`}
                className="block text-accent font-semibold underline underline-offset-[6px] decoration-1 hover:decoration-2 break-all mb-8"
                style={{ fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: 1.15 }}
              >
                {profile.contact.email}
              </a>

              <Button href={profile.contact.whatsapp} variant="ghost" className="mb-10">
                {homePage.contact.whatsapp}
              </Button>

              <ul className="flex flex-wrap gap-x-8">
                {socials.map((s) => (
                  <li key={s.href}>
                    <TextLink href={s.href} className="t-small inline-flex items-center min-h-11">
                      {s.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-5">
              <h3 className="t-h3 text-ink mb-6">{contact.formHeading}</h3>
              <ContactForm {...contact} fallbackEmail={profile.contact.email} />
            </div>
          </Grid>
        </Container>
      </Realm>
    </div>
  );
}
