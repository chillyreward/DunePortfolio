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
            <h1 className="t-h1 text-ink mb-4">
              {aboutContent.heading}
            </h1>
            <p className="t-body text-ink-2">
              {aboutContent.lead}
            </p>
          </div>

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
                  className="t-body text-ink-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* About Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full rounded overflow-hidden bg-surface">
                <Image
                  src={profile.portraitAbout.src}
                  alt={profile.portraitAbout.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover grayscale"
                />
              </div>
              <div className="mt-3 flex items-center justify-between t-meta">
                <span>{profile.name}</span>
                <span>{profile.education.location}</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="mb-20 md:mb-28">
            <h2 className="t-h2 text-ink mb-8">
              {aboutContent.educationHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-line pt-6">
              <div className="md:col-span-8">
                <h3 className="t-h3 text-ink mb-1">{profile.education.degree}</h3>
                <p className="t-body text-ink-2">{profile.education.institution}</p>
              </div>
              <dl className="md:col-span-4 grid grid-cols-2 gap-4">
                <div>
                  <dt className="t-meta">{aboutContent.periodLabel}</dt>
                  <dd className="t-small text-ink">{profile.education.period}</dd>
                </div>
                <div>
                  <dt className="t-meta">{aboutContent.graduationLabel}</dt>
                  <dd className="t-small text-ink">{profile.education.expectedGraduation}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Technical Toolkit & Skills */}
          <div>
            <div className="max-w-2xl mb-8">
              <h2 className="t-h2 text-ink mb-2">
                {aboutContent.skillsHeading}
              </h2>
              <p className="t-body text-ink-2">{aboutContent.skillsLead}</p>
            </div>
            <SkillGroups />
          </div>
        </Container>
      </Realm>

      {/* 2. Hackathons & Competitions (Fremen Realm Band) */}
      <Realm name="fremen" id="hackathons" className="py-20 md:py-28 border-b border-line">
        <Container>
          {/* Section Header */}
          <div className="pb-12">
            <RealmMarker realm="fremen" className="mb-4" />
            <h2 className="t-h2 text-ink">{aboutContent.hackathonsHeading}</h2>
          </div>

          {/* Hackathon Timeline Full */}
          <div>
            <HackathonTimeline variant="full" />
          </div>

          {/* Hackathon Photo Gallery */}
          {redWhiteBuild && redWhiteBuild.photos && redWhiteBuild.photos.length > 0 && (
            <div className="pt-14">
              <PhotoGallery
                photos={redWhiteBuild.photos}
                heading={aboutContent.galleryHeading}
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
            <div className="mb-20">
              <Epigraph
                text={aboutEpigraph.quote}
                attribution={aboutEpigraph.attribution}
              />
            </div>
          )}

          {/* Closing & Call to Action */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <h2 className="t-h2 text-ink">{aboutContent.closingHeading}</h2>
              <p className="t-body text-ink-2 text-base leading-relaxed">
                {aboutContent.closingText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/#contact" variant="primary">
                {aboutContent.contactCta}
              </Button>
              {profile.cvPath && (
                <Button href={profile.cvPath} download variant="ghost">
                  {aboutContent.cvCta}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Realm>
    </div>
  );
}
