import React from 'react';
import Image from 'next/image';
import { hackathons } from '@/content/hackathons';
import { ui } from '@/content/ui';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

export interface HackathonTimelineProps {
  variant?: 'compact' | 'full';
  className?: string;
}

function yearOf(date: string): string {
  return date.match(/\d{4}/)?.[0] ?? date;
}

export function HackathonTimeline({ variant = 'compact', className }: HackathonTimelineProps) {
  return (
    <ol className={cn('border-b border-line', className)}>
      {hackathons.map((h) => {
        // The first photo is the lead image (the winner's cheque for Red, White & Build).
        const leadPhoto = variant === 'compact' ? h.photos[0] : undefined;

        return (
          <li key={h.id} className="border-t border-line py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              <p className="md:col-span-2 t-h2 text-ink">{yearOf(h.date)}</p>

              <div className={cn('md:col-span-10', leadPhoto && 'lg:col-span-6')}>
                <p className="t-meta mb-2">{h.placement}</p>
                <h3 className="t-h3 text-ink mb-4">{h.name}</h3>
                <p className="t-body text-ink-2 mb-6">{h.summary}</p>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                  <div>
                    <dt className="t-meta">{ui.hackathon.organiser}</dt>
                    <dd className="t-small text-ink">{h.organizer}</dd>
                  </div>
                  <div>
                    <dt className="t-meta">{ui.hackathon.project}</dt>
                    <dd className="t-small">
                      {h.projectSlug ? (
                        <TextLink href={`/work/${h.projectSlug}`} className="relative after:absolute after:inset-x-0 after:-inset-y-[14px] after:content-['']">
                          {h.project}
                        </TextLink>
                      ) : (
                        <span className="text-ink">{h.project}</span>
                      )}
                    </dd>
                  </div>
                  {h.prize && (
                    <div>
                      <dt className="t-meta">{ui.hackathon.prize}</dt>
                      <dd className="t-small text-ink">{h.prize}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="t-meta">{h.date}</dt>
                    <dd className="t-small text-ink">{h.location}</dd>
                  </div>
                  {h.team && h.team.length > 0 && (
                    <div className="col-span-2 sm:col-span-4">
                      <dt className="t-meta">{ui.hackathon.team}</dt>
                      <dd className="t-small text-ink">{h.team.join(', ')}</dd>
                    </div>
                  )}
                </dl>

                {variant === 'full' && h.certificate && (
                  <figure className="mt-8 max-w-xs">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-surface">
                      <Image src={h.certificate.src} alt={h.certificate.alt} fill sizes="320px" className="object-cover" />
                    </div>
                    <figcaption className="t-meta mt-2">{h.certificate.alt}</figcaption>
                  </figure>
                )}
              </div>

              {leadPhoto && (
                <figure className="md:col-span-10 md:col-start-3 lg:col-span-4 lg:col-start-auto">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-surface">
                    <Image
                      src={leadPhoto.src}
                      alt={leadPhoto.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="t-meta mt-2">{leadPhoto.alt}</figcaption>
                </figure>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
