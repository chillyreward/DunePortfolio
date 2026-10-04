import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroHaze } from './HeroHaze';
import { cv } from '@/content/cv';
import { profile } from '@/content/profile';
import { homePage } from '@/content/home';

const { hero } = homePage;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-depth relative isolate w-full overflow-hidden bg-bg border-b border-line flex flex-col lg:block lg:h-[calc(100svh-72px)] lg:min-h-[640px] lg:max-h-[1000px]"
    >
      {/* Location, top left */}
      <Container className="relative z-20 w-full pt-6 lg:pt-8">
        <p className="t-meta">{profile.education.location}</p>
      </Container>

      {/* Stage: portrait bottom-anchored, KIDAVI crossing it at chest height */}
      <div className="relative h-[58svh] min-h-[360px] max-h-[560px] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0 lg:max-h-none">
        <div className="hero-rise absolute bottom-0 left-1/2 -translate-x-1/2 h-full lg:h-[78%] aspect-[843/1370] pointer-events-none">
          {/* Giedi only: soft rim light so the black blazer separates from the black page */}
          <div
            aria-hidden="true"
            className="hidden dark:block absolute -inset-x-[30%] inset-y-0"
            style={{ background: 'radial-gradient(closest-side, rgb(var(--ink) / 0.10), transparent)' }}
          />
          <Image
            src={profile.portraitCutout.src}
            alt={profile.portraitCutout.alt}
            fill
            priority
            sizes="(max-width: 1024px) 60vw, 480px"
            className="object-contain object-bottom select-none grayscale dark:brightness-125 dark:contrast-[1.15]"
          />
        </div>

        <HeroHaze className="hero-sink absolute inset-x-0 bottom-[47%] lg:bottom-[25%] z-10 pointer-events-none mix-blend-difference">
          <Container>
            <h1
              id="hero-title"
              className="t-wordmark text-wordmark text-center whitespace-nowrap select-none"
              style={{ fontSize: 'clamp(56px, 19vw, 280px)' }}
            >
              <span aria-hidden="true">{hero.wordmark}</span>
              <span className="sr-only">{hero.srName}</span>
            </h1>
          </Container>
        </HeroHaze>
      </div>

      {/* Intro and actions */}
      <Container className="relative z-20 w-full pt-6 pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="t-small text-ink max-w-[36ch] lg:max-w-[30ch] lg:max-w-[34ch]">{hero.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#work" variant="primary">
              {hero.primaryCta}
            </Button>
            {profile.cvPath ? (
              <Button href={profile.cvPath} download={cv.downloadFileName} variant="ghost">
                {hero.cvCta}
              </Button>
            ) : (
              <Button href="#contact" variant="ghost">
                {hero.contactCta}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
