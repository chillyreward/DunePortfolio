import type { Metadata, Viewport } from 'next';
import { archivo } from './fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-ink focus:rounded"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
