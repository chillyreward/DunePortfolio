import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';
import { cv } from '@/content/cv';
import { profile } from '@/content/profile';
import { primaryNav } from '@/content/navigation';
import { search } from '@/content/interactions';
import { ui } from '@/content/ui';
import { SearchButton } from '@/components/interactions/SearchButton';
import { RealmCompass } from '@/components/interactions/RealmCompass';

export function SiteHeader() {
  const socials = [
    { label: ui.site.socials.github, href: profile.contact.github },
    { label: ui.site.socials.linkedin, href: profile.contact.linkedin },
    { label: ui.site.socials.fiverr, href: profile.contact.fiverr },
  ];

  return (
    <header className="w-full h-[72px] bg-bg lg:sticky lg:top-0 lg:z-40 print:hidden">
      <Container className="h-full flex items-center justify-between">
        {/* Left: Brand / Home Link */}
        <Link
          href="/"
          className="inline-flex items-center min-h-11 whitespace-nowrap text-base font-bold text-ink rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          style={{ fontStretch: '125%' }}
        >
          {profile.name}
        </Link>

        {/* Desktop: realm compass (lg+) */}
        <RealmCompass labels={ui.realms} />

        {/* Right (Desktop md+): NavLinks, Search, ThemeToggle, Download CV (if cvPath set) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLinks items={primaryNav} />
          <SearchButton label={search.button} />
          <ThemeToggle />
          {profile.cvPath && (
            <Button
              href={profile.cvPath}
              download={cv.downloadFileName}
              variant="ghost"
              className="hidden lg:inline-flex text-[15px]"
            >
              {ui.site.downloadCv}
            </Button>
          )}
        </div>

        {/* Right (Mobile <md): ThemeToggle + MobileMenu */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <MobileMenu
            items={primaryNav}
            email={profile.contact.email}
            whatsappHref={profile.contact.whatsapp}
            socials={socials}
            searchLabel={search.button}
            name={profile.name}
            labels={{
              menu: ui.site.menu,
              close: ui.site.close,
              openMenu: ui.site.openMenu,
              closeMenu: ui.site.closeMenu,
              mobileNav: ui.site.mobileNav,
              whatsapp: ui.site.whatsapp,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
