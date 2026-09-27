import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Epigraph } from '@/components/ui/Epigraph';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { SkillGroups } from '@/components/about/SkillGroups';
import { HackathonTimeline } from '@/components/hackathons/HackathonTimeline';
import { PhotoGallery } from '@/components/hackathons/PhotoGallery';
import { profile } from '@/content/profile';
import { hackathons } from '@/content/hackathons';
import { aboutContent } from '@/content/about';
import { getEpigraph } from '@/content/epigraphs';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, education, technical toolkit, and hackathon record of Lenny Kidavi — Computer Science student and product builder in Nairobi.',
};

export default function AboutPage() {
  const redWhiteBuild = hackathons.find((h) => h.id === 'red-white-build');
  const aboutEpigraph = getEpigraph('about');

  return (
    <div className="flex flex-col w-full">
      {/* 1. Header, Bio, Education & Skills (Arrakis Base Ground) */}
      <Realm name="arrakis" className="py-16 md:py-24 border-b border-line">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <RealmMarker realm="arrakis" className="mb-4" />
            <h1 className="t-h1 text-ink uppercase tracking-tight mb-4">
              {aboutContent.heading}
            </h1>
            <p className="t-lead text-ink-2 text-lg md:text-xl font-normal leading-relaxed">
              {aboutContent.lead}
            </p>
          </div>

          {/* Draft Status Notice if applicable */}
          {profile.bioStatus === 'draft' && (
            <div className="mb-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-surface/60 border border-line text-xs font-mono text-ink-2">
              <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" aria-hidden="true" />
              <span>{aboutContent.bioStatusNotice}</span>
            </div>
          )}

          {/* Main Story & Portrait Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20 md:mb-28">
            {/* Bio Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="t-h2 text-ink mb-6">
                {aboutContent.storyHeading}
              </h2>
              {profile.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="t-body text-ink-2 text-base md:text-lg leading-relaxed font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* About Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full rounded-[2px] overflow-hidden border border-line bg-surface/40">
                <Image
                  src={profile.portraitAbout.src}
                  alt={profile.portraitAbout.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-ink-2">
                <span>{profile.name}</span>
                <span>{profile.education.location}</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="mb-20 md:mb-28 pt-12 border-t border-line/60">
            <h2 className="t-h2 text-ink mb-8">
              {aboutContent.educationHeading}
            </h2>
            <div className="border border-line rounded-[2px] p-6 sm:p-8 bg-surface/30">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-surface border border-line text-xs font-mono text-ink">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Higher Education</span>
                  </div>
                  <h3 className="t-h3 text-ink">
                    {profile.education.degree}
                  </h3>
                  <p className="text-base text-ink-2 font-medium">
                    {profile.education.institution}
                  </p>
                  <p className="text-sm text-ink-2 font-sans leading-relaxed">
                    Undergraduate coursework encompassing systems programming, algorithms, data structures, and computer architecture, while independently exploring machine learning systems and production web engineering.
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2.5 pt-4 md:pt-0 md:border-l md:border-line md:pl-6 text-xs font-mono text-ink-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-ink-2" aria-hidden="true" />
                    <span>{profile.education.period} (Graduating {profile.education.expectedGraduation})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-ink-2" aria-hidden="true" />
                    <span>{profile.education.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>In Good Academic Standing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Toolkit & Skills */}
          <div className="pt-12 border-t border-line/60">
            <div className="max-w-2xl mb-8">
              <h2 className="t-h2 text-ink mb-2">
                {aboutContent.skillsHeading}
              </h2>
              <p className="t-body text-ink-2 text-sm md:text-base">
                An honest inventory of tools grouped by practical exposure and production usage. No arbitrary percentage bars or vanity ratings.
              </p>
            </div>
            <SkillGroups />
          </div>
        </Container>
      </Realm>

      {/* 2. Hackathons & Competitions (Fremen Realm Band) */}
      <Realm name="fremen" id="hackathons" className="py-20 md:py-28 border-b border-line">
        <Container>
          {/* Section Header */}
          <div className="pb-12 border-b border-line">
            <RealmMarker realm="fremen" className="mb-4" />
            <h2 className="t-h2 text-ink">{aboutContent.hackathonsHeading}</h2>
            <p className="t-body text-ink-2 max-w-2xl mt-2">
              {aboutContent.hackathonsLead}
            </p>
          </div>

          {/* Hackathon Timeline Full */}
          <div className="pt-12">
            <HackathonTimeline variant="full" />
          </div>

          {/* Hackathon Photo Gallery */}
          {redWhiteBuild && redWhiteBuild.photos && redWhiteBuild.photos.length > 0 && (
            <div className="pt-14 mt-14 border-t border-line/60">
              <PhotoGallery
                photos={redWhiteBuild.photos}
                heading="Red, White & Build — On-site Documentation"
              />
            </div>
          )}
        </Container>
      </Realm>

      {/* 3. Epigraph & Closing CTA (Arrakis Realm) */}
      <Realm name="arrakis" className="py-20 md:py-28">
        <Container>
          {/* Epigraph slot if populated */}
          {aboutEpigraph && (
            <div className="mb-16 py-8 border-y border-line/60">
              <Epigraph
                text={aboutEpigraph.quote}
                attribution={aboutEpigraph.attribution}
              />
            </div>
          )}

          {/* Closing & Call to Action */}
          <div className="border border-line rounded-[2px] p-8 sm:p-12 bg-surface/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <h2 className="t-h2 text-ink">{aboutContent.closingHeading}</h2>
              <p className="t-body text-ink-2 text-base leading-relaxed">
                {aboutContent.closingText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/#contact" variant="primary">
                Get in Touch
              </Button>
              {profile.cvPath ? (
                <Button href={profile.cvPath} download variant="ghost">
                  Download CV
                </Button>
              ) : (
                <Button variant="ghost" disabled aria-disabled="true" title="CV PDF arriving soon">
                  Download CV (Soon)
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Realm>
    </div>
  );
}
