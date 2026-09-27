import type { Metadata, Viewport } from 'next';
import { archivo } from './fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import './globals.css';

const ShaiHulud = dynamic(
  () => import('@/components/effects/ShaiHulud').then((mod) => mod.ShaiHulud),
  { ssr: false }
);

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lennydev.vercel.app'),
  title: {
    default: 'Lenny Kidavi — developer and product builder',
    template: '%s — Lenny Kidavi',
  },
  description:
    'Lenny Kidavi is a Computer Science student in Nairobi who designs and builds web products, working toward machine learning engineering.',
  openGraph: {
    title: {
      default: 'Lenny Kidavi — developer and product builder',
      template: '%s — Lenny Kidavi',
    },
    description:
      'Lenny Kidavi is a Computer Science student in Nairobi who designs and builds web products, working toward machine learning engineering.',
    type: 'website',
    locale: 'en_KE',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#D9CBB0' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-ink font-sans">
        <div id="top" className="flex flex-col min-h-dvh">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-ink focus:rounded-sm print:hidden"
          >
            Skip to content
          </a>
          <ThemeProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="outline-none flex-1">
              {children}
            </main>
            <SiteFooter />
            <ShaiHulud />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
