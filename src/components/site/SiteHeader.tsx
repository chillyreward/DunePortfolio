import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';
import { profile } from '@/content/profile';
import { primaryNav } from '@/content/navigation';

export function SiteHeader() {
  const socials = [
    { label: 'GitHub', href: profile.contact.github },
    { label: 'LinkedIn', href: profile.contact.linkedin },
    { label: 'Fiverr', href: profile.contact.fiverr },
  ];

  return (
    <header className="w-full h-[72px] print:hidden">
      <Container className="h-full flex items-center justify-between">
        {/* Left: Brand / Home Link */}
        <Link
          href="/"
          className="inline-flex items-center min-h-11 text-base font-bold text-ink rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
          style={{ fontStretch: '125%' }}
        >
          {profile.name}
        </Link>

        {/* Right (Desktop md+): NavLinks, ThemeToggle, Download CV (if cvPath set) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks items={primaryNav} />
          <ThemeToggle />
          {profile.cvPath && (
            <Button
              href={profile.cvPath}
              download
              variant="ghost"
              className="text-[15px]"
            >
              Download CV
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
          />
        </div>
      </Container>
    </header>
  );
}
