import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { hackathons } from '@/content/hackathons';
import { skillGroups } from '@/content/skills';
import { epigraphs } from '@/content/epigraphs';
import { Container } from '@/components/ui/Container';

export const dynamic = 'force-static';

export default function DevContentPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg py-16 text-ink">
      <Container className="space-y-20">
        <header className="border-b border-line pb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-medium">Dev Tool</p>
              <h1 className="text-4xl font-extrabold uppercase tracking-tight text-ink mt-1">
                Content & Image Verification
              </h1>
            </div>
            <Link
              href="/dev/tokens"
              className="text-sm font-medium text-ink-2 hover:text-ink underline underline-offset-4"
            >
              Go to /dev/tokens →
            </Link>
          </div>
          <p className="text-sm text-ink-2 mt-2">
            Inspecting Zod-validated content files, manifest images, project statuses, and open TODO items.
          </p>
        </header>

        {/* PROFILE SECTION */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-tight">01. Profile</h2>
            <span className="text-xs text-ink-2">src/content/profile.ts</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4 lg:col-span-2">
              <div className="bg-surface/50 border border-line p-6 rounded-sm space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-ink">
                    {profile.name} {profile.alias && <span className="text-ink-2 font-normal">({profile.alias})</span>}
                  </h3>
                  <p className="text-accent font-medium text-sm mt-0.5">{profile.title}</p>
                </div>

                <div className="border-l-2 border-accent pl-4 py-1 italic text-ink-2 text-sm">
                  &ldquo;{profile.positioning}&rdquo;
                </div>

                <div className="space-y-2 text-sm text-ink-2 leading-relaxed">
                  {profile.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-ink font-semibold">Education:</span>
                    <p className="text-ink-2 mt-0.5">
                      {profile.education.degree} ({profile.education.period})
                      <br />
                      {profile.education.institution}, {profile.education.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-ink font-semibold">Contact:</span>
                    <p className="text-ink-2 mt-0.5">
                      {profile.contact.email} · {profile.contact.phone}
                      <br />
                      <a href={profile.contact.github} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                        GitHub
                      </a>{' '}
                      ·{' '}
                      <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                        LinkedIn
                      </a>{' '}
                      ·{' '}
                      <a href={profile.contact.whatsapp} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                        WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-surface/50 border border-line p-4 rounded-sm">
                <span className="text-xs uppercase text-ink-2 tracking-wider block mb-2 font-medium">
                  Hero Cutout ({profile.portraitCutout.width}×{profile.portraitCutout.height})
                </span>
                <div className="relative aspect-[3/4] bg-surface rounded-sm overflow-hidden border border-line flex items-center justify-center">
                  <Image
                    src={profile.portraitCutout.src}
                    alt={profile.portraitCutout.alt}
                    fill
                    sizes="300px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-surface/50 border border-line p-2 rounded-sm">
                  <span className="text-[10px] text-ink-2 block mb-1">portrait.webp</span>
                  <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                    <Image
                      src={profile.portrait.src}
                      alt={profile.portrait.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-surface/50 border border-line p-2 rounded-sm">
                  <span className="text-[10px] text-ink-2 block mb-1">portrait-about.webp</span>
                  <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                    <Image
                      src={profile.portraitAbout.src}
                      alt={profile.portraitAbout.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-tight">02. Projects ({projects.length})</h2>
            <span className="text-xs text-ink-2">src/content/projects.ts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="bg-surface/50 border border-line rounded-sm p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] bg-surface rounded-sm overflow-hidden border border-line">
                    {project.cover && (
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 bg-bg/90 border border-line rounded-sm uppercase tracking-wider font-semibold">
                        {project.type}
                      </span>
                      {!project.publish && (
                        <span className="text-[10px] px-2 py-0.5 bg-spice/90 text-white font-medium rounded-sm">
                          Draft / Unlisted
                        </span>
                      )}
                      {!project.permission && (
                        <span className="text-[10px] px-2 py-0.5 bg-stone-700 text-white font-medium rounded-sm">
                          No Permission
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl font-bold text-ink">{project.title}</h3>
                      {project.year && <span className="text-xs text-ink-2">{project.year}</span>}
                    </div>
                    <p className="text-xs text-accent font-medium mt-0.5">{project.tagline}</p>
                    <p className="text-xs text-ink-2 mt-2 leading-relaxed">{project.summary}</p>
                  </div>

                  {project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-0.5 bg-bg border border-line text-ink-2 rounded-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.gallery.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] text-ink-2 uppercase tracking-wider block mb-1">
                        Gallery Captures ({project.gallery.length})
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {project.gallery.map((imgRef, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video bg-surface border border-line rounded-sm overflow-hidden"
                          >
                            <Image
                              src={imgRef.src}
                              alt={imgRef.alt}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                  <div className="flex gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline font-medium hover:opacity-80"
                      >
                        Live Site ↗
                      </a>
                    ) : (
                      <span className="text-ink-2 opacity-50">No live URL</span>
                    )}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink-2 underline hover:text-ink"
                      >
                        Repository ↗
                      </a>
                    ) : (
                      <span className="text-ink-2 opacity-50">Private repo</span>
                    )}
                  </div>
                  <span className="text-[11px] text-ink-2">slug: {project.slug}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* HACKATHONS SECTION */}
        <section className="space-y-6">
          <div className="border-b border-line pb-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-tight">03. Hackathons ({hackathons.length})</h2>
            <span className="text-xs text-ink-2">src/content/hackathons.ts</span>
          </div>

          <div className="space-y-8">
            {hackathons.map((h) => (
              <div key={h.id} className="bg-surface/50 border border-line rounded-sm p-6 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-ink">{h.name}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-accent text-accent-ink rounded-sm">
                        {h.placement}
                      </span>
                      {h.prize && (
                        <span className="text-xs font-semibold px-2 py-0.5 bg-spice text-white rounded-sm">
                          {h.prize}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-2 mt-1">
                      {h.organizer} · {h.date} · {h.location} · Project:{' '}
                      <span className="font-semibold text-ink">{h.project}</span>
                    </p>
                  </div>
                  <span className="text-xs text-ink-2">Team: {h.team.join(', ')}</span>
                </div>

                <p className="text-sm text-ink-2 leading-relaxed">{h.summary}</p>

                {h.certificate && (
                  <div className="pt-2">
                    <span className="text-[10px] text-ink-2 uppercase tracking-wider block mb-2 font-medium">
                      Official Certificate
                    </span>
                    <div className="relative max-w-md aspect-[4/3] bg-surface border border-line rounded-sm overflow-hidden">
                      <Image
                        src={h.certificate.src}
                        alt={h.certificate.alt}
                        fill
                        sizes="400px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {h.photos.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] text-ink-2 uppercase tracking-wider block mb-2 font-medium">
                      Event Photography ({h.photos.length})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {h.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="relative aspect-video bg-surface border border-line rounded-sm overflow-hidden"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="180px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & EPIGRAPHS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <div className="border-b border-line pb-2 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold uppercase tracking-tight">04. Skill Groups</h2>
              <span className="text-xs text-ink-2">src/content/skills.ts</span>
            </div>

            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.id} className="bg-surface/50 border border-line rounded-sm p-4 space-y-2">
                  <h3 className="text-base font-bold text-ink">{group.title}</h3>
                  <p className="text-xs text-ink-2">{group.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 bg-bg border border-line text-ink rounded-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="border-b border-line pb-2 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold uppercase tracking-tight">05. Epigraphs</h2>
              <span className="text-xs text-ink-2">src/content/epigraphs.ts</span>
            </div>

            <div className="space-y-4">
              {epigraphs.map((e) => (
                <div key={e.slot} className="bg-surface/50 border border-line rounded-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold uppercase text-accent">
                      Slot: {e.slot}
                    </span>
                    <span className="text-xs text-ink-2">{e.attribution}</span>
                  </div>
                  {e.quote.trim() ? (
                    <blockquote className="text-sm italic text-ink border-l-2 border-accent pl-3 py-1">
                      &ldquo;{e.quote}&rdquo;
                    </blockquote>
                  ) : (
                    <div className="p-3 bg-bg border border-dashed border-line text-xs text-ink-2 rounded-sm">
                      <span className="font-semibold text-spice">Awaiting Lenny:</span> No quote text yet. (Per
                      rules, agents never fill Dune quotes; Lenny enters them in `src/content/epigraphs.ts`).
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
