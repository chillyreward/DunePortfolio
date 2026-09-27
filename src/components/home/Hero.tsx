import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroHaze } from './HeroHaze';
import { profile } from '@/content/profile';
import { homePage } from '@/content/home';

export function Hero() {
  return (
    <section aria-label="Hero" className="relative w-full overflow-hidden border-b border-line">
      <HeroHaze>
        <div className="relative min-h-[calc(100dvh-72px)] min-h-[580px] max-h-[920px] flex flex-col justify-between pt-8 pb-12 sm:pb-16">
          {/* Top meta tags */}
          <Container className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="t-meta text-ink-2 font-mono uppercase tracking-widest text-xs">
                {profile.education.location} · {homePage.hero.role}
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-medium text-ink">{profile.availability}</span>
              </div>
            </div>
          </Container>

          {/* Center: Cutout portrait + Wordmark */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Layer 0: Portrait cutout */}
            <div className="absolute inset-0 flex items-end justify-center md:justify-end md:pr-16 lg:pr-32 pointer-events-none z-0">
              <div className="relative w-[320px] sm:w-[420px] md:w-[480px] lg:w-[540px] h-[85%] max-h-[640px]">
                <Image
                  src={profile.portraitCutout.src}
                  alt={profile.portraitCutout.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1200px) 480px, 540px"
                  className="object-contain object-bottom select-none"
                />
              </div>
            </div>

            {/* Layer 10: Giant display wordmark */}
            <Container className="w-full relative z-10 pointer-events-none">
              <h1
                className="text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[124px] font-black uppercase tracking-tight leading-[0.88] select-none text-ink mix-blend-multiply dark:mix-blend-difference"
                style={{ fontStretch: '125%' }}
              >
                LENNY
                <br />
                KIDAVI
              </h1>
            </Container>
          </div>

          {/* Layer 20: Bottom summary & CTAs */}
          <Container className="relative z-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8 lg:col-span-7">
                <p className="t-lead text-ink max-w-xl">
                  {homePage.hero.tagline}
                </p>
              </div>
              <div className="md:col-span-4 lg:col-span-5 flex flex-wrap gap-4 md:justify-end">
                <Button href="#work" variant="primary">
                  Selected Work
                </Button>
                <Button href="#contact" variant="ghost">
                  Contact
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </HeroHaze>
    </section>
  );
}
