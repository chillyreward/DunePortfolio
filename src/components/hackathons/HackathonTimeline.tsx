import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { hackathons } from '@/content/hackathons';
import { cn } from '@/lib/cn';
import { Trophy, Award } from 'lucide-react';

export interface HackathonTimelineProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function HackathonTimeline({ variant = 'compact', className }: HackathonTimelineProps) {
  return (
    <div className={cn('space-y-12', className)}>
      {hackathons.map((h) => {
        const isWinner = h.placement.toLowerCase().includes('winner') || h.placement.toLowerCase().includes('first');
        const hasPhotos = h.photos && h.photos.length > 0;
        const mainPhoto = hasPhotos ? h.photos[4] || h.photos[0] : null; // photo-05 is award ceremony

        return (
          <div
            key={h.id}
            className="border border-line/60 rounded-lg p-6 sm:p-8 bg-surface/20 hover:border-line transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Content side */}
              <div className={cn(hasPhotos && variant === 'compact' ? 'lg:col-span-7' : 'lg:col-span-12')}>
                {/* Meta header */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium',
                      isWinner
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-ink/5 text-ink-2 border border-line'
                    )}
                  >
                    {isWinner ? <Trophy className="w-3.5 h-3.5" aria-hidden="true" /> : <Award className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{h.placement}</span>
                  </span>

                  {h.prize && (
                    <span className="text-xs font-mono text-ink font-semibold px-2 py-0.5 rounded bg-surface border border-line">
                      Prize: {h.prize}
                    </span>
                  )}

                  <span className="text-xs font-mono text-ink-2 ml-auto">
                    {h.date} · {h.location}
                  </span>
                </div>

                {/* Hackathon title & organizer */}
                <h3 className="t-h3 text-ink mb-1">{h.name}</h3>
                <p className="t-meta text-ink-2 font-mono text-xs mb-4">Organized by {h.organizer}</p>

                {/* Summary */}
                <p className="text-sm md:text-base text-ink-2 leading-relaxed mb-6">{h.summary}</p>

                {/* Built Project Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-4 border-t border-line/50">
                  <span className="text-ink-2">Built Project:</span>
                  {h.projectSlug ? (
                    <Link
                      href={`/work/${h.projectSlug}`}
                      className="font-medium text-accent hover:underline underline-offset-4 decoration-1"
                    >
                      {h.project} →
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{h.project}</span>
                  )}
                  {h.team && h.team.length > 0 && (
                    <span className="text-ink-2 ml-auto">
                      Team: {h.team.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Award / Cheque Photo in compact mode */}
              {hasPhotos && variant === 'compact' && mainPhoto && (
                <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded overflow-hidden border border-line bg-surface/50">
                  <Image
                    src={mainPhoto.src}
                    alt={mainPhoto.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-[11px] text-white/90 font-mono truncate">{mainPhoto.alt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
