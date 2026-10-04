import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';
import { TextLink } from '@/components/ui/TextLink';
import { Wordmark } from '@/components/ui/Wordmark';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { primaryNav } from '@/content/navigation';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: ui.site.socials.github, href: profile.contact.github },
    { label: ui.site.socials.linkedin, href: profile.contact.linkedin },
    { label: ui.site.socials.fiverr, href: profile.contact.fiverr },
    ...(profile.contact.x ? [{ label: ui.site.socials.x, href: profile.contact.x }] : []),
  ];

  return (
    <footer className="w-full border-t border-line pt-[clamp(64px,8vw,128px)] bg-bg text-ink print:hidden">
      <Container>
        <Grid className="gap-12 md:gap-8">
          {/* Cols 1–5: Get in touch */}
          <div className="col-span-4 md:col-span-5 flex flex-col gap-4">
            <h2 className="t-h3">{ui.footer.contact}</h2>
            <p className="t-body text-ink-2">{profile.availability}</p>
            <div className="pt-2 flex flex-col gap-3">
              <TextLink
                href={`mailto:${profile.contact.email}`}
                className="t-h3 text-accent hover:opacity-85 break-all inline-flex min-h-11 items-center"
              >
                {profile.contact.email}
              </TextLink>
              <div>
                <TextLink href={profile.contact.whatsapp} className="t-body font-medium inline-flex min-h-11 items-center">
                  {ui.footer.whatsapp}
                </TextLink>
              </div>
            </div>
          </div>

          {/* Cols 7–9: Elsewhere */}
          <div className="col-span-4 md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <h2 className="t-meta">{ui.footer.elsewhere}</h2>
            <ul className="flex flex-col">
              {socials.map((social) => (
                <li key={social.label}>
                  <TextLink href={social.href} className="t-body inline-flex items-center min-h-11">
                    {social.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Cols 10–12: Site Navigation */}
          <div className="col-span-4 md:col-span-3 md:col-start-10 flex flex-col gap-4">
            <h2 className="t-meta">{ui.footer.site}</h2>
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="t-body inline-flex items-center min-h-11 text-ink hover:text-accent hover:underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Grid>

        {/* Full-width Wordmark */}
        <div
          className="mt-[clamp(64px,10vw,160px)] w-full overflow-hidden text-ink"
          aria-hidden="true"
        >
          <Wordmark text="KIDAVI" fit />
        </div>

        {/* Bottom Metadata Row */}
        <div className="mt-8 border-t border-line py-6 flex flex-wrap items-center justify-between gap-4 t-meta text-ink-2">
          <p>© {currentYear} {profile.name}</p>
          <p>{profile.education.location}</p>
          <a
            href="#top"
            className="inline-flex items-center min-h-11 hover:text-ink hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] rounded-sm"
          >
            {ui.footer.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
