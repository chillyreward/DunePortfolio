'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavActive, type NavMatchMode } from '@/lib/nav';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

export interface MobileNavItem {
  label: string;
  href: string;
  match: NavMatchMode;
}

export interface MobileSocialItem {
  label: string;
  href: string;
}

export interface MobileMenuProps {
  items: readonly MobileNavItem[] | MobileNavItem[];
  email: string;
  whatsappHref: string;
  socials: readonly MobileSocialItem[] | MobileSocialItem[];
}

export function MobileMenu({ items, email, whatsappHref, socials }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Sync native dialog with isOpen state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      closeButtonRef.current?.focus();
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Close on pathname change
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      closeMenu();
    }
  }, [pathname, closeMenu]);

  // Viewport resize check: close if width >= 768px
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches && isOpen) {
        closeMenu();
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [isOpen, closeMenu]);

  // Manage body scroll lock and cleanup
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-dialog"
        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[15px] font-semibold text-ink px-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
      >
        Menu
      </button>

      <dialog
        id="mobile-nav-dialog"
        ref={dialogRef}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        className={cn(
          'fixed inset-0 w-screen h-dvh max-w-none max-h-none m-0 p-0 border-none bg-bg text-ink backdrop:bg-transparent backdrop:backdrop-blur-none z-50',
          isOpen ? 'flex flex-col' : 'hidden'
        )}
      >
        <Container className="h-full flex flex-col justify-between py-0">
          {/* Top row matching 72px header */}
          <div className="h-[72px] flex items-center justify-between border-b border-line">
            <span className="text-base font-bold text-ink" style={{ fontStretch: '125%' }}>
              Lenny Kidavi
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[15px] font-semibold text-ink px-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]"
            >
              Close
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation" className="py-12">
            <ul className="flex flex-col gap-6">
              {items.map((item) => {
                const active = isNavActive(pathname, item.href, item.match);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        't-h2 inline-block text-ink transition-colors',
                        active && 'underline decoration-1 underline-offset-8 text-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer push area */}
          <div className="mt-auto border-t border-line py-8 flex flex-col gap-4">
            <div>
              <p className="t-meta mb-1 text-ink-2">Direct Contact</p>
              <TextLink href={`mailto:${email}`} className="text-base font-medium">
                {email}
              </TextLink>
            </div>
            <div>
              <TextLink href={whatsappHref} className="text-base font-medium">
                WhatsApp
              </TextLink>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {socials.map((s) => (
                <TextLink key={s.label} href={s.href} className="t-small text-ink-2">
                  {s.label}
                </TextLink>
              ))}
            </div>
          </div>
        </Container>
      </dialog>
    </div>
  );
}
