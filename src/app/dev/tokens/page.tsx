import { notFound } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Epigraph } from '@/components/ui/Epigraph';
import { Wordmark } from '@/components/ui/Wordmark';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ThemeSync } from './ThemeSync';

export const metadata = {
  robots: {
    index: false,
  },
};

const TOKENS = [
  { name: '--bg', class: 'bg-bg', hexArrakis: '#D9CBB0', hexGiedi: '#000000', border: true },
  { name: '--surface', class: 'bg-surface', hexArrakis: '#EFE7D8', hexGiedi: '#161616', border: true },
  { name: '--ink', class: 'bg-ink', hexArrakis: '#231D14', hexGiedi: '#F2F2F2' },
  { name: '--ink-2', class: 'bg-ink-2', hexArrakis: '#574E40', hexGiedi: '#A3A3A3' },
  { name: '--accent', class: 'bg-accent', hexArrakis: '#1E45C8', hexGiedi: '#7F97FF' },
  { name: '--accent-ink', class: 'bg-accent-ink', hexArrakis: '#FFFFFF', hexGiedi: '#000000', border: true },
  { name: '--spice', class: 'bg-spice', hexArrakis: '#C8801A', hexGiedi: '#C8801A' },
  { name: '--line', class: 'bg-line', hexArrakis: '18% alpha', hexGiedi: '14% alpha', border: true },
];

function ThemePanel({
  theme,
  title,
}: {
  theme: 'arrakis' | 'giedi';
  title: string;
}) {
  const isGiedi = theme === 'giedi';

  return (
    <div
      data-theme={theme}
      className="bg-bg text-ink p-6 md:p-8 rounded border border-line flex flex-col gap-10 overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <p className="t-meta">Tokens &amp; Typography ({theme})</p>
        </div>
      </div>

      {/* Colour Swatches */}
      <div>
        <h3 className="t-h3 mb-4">Colour Tokens</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOKENS.map((token) => (
            <div
              key={token.name}
              className="p-3 rounded border border-line bg-surface flex flex-col gap-2"
            >
              <div
                className={`w-full h-10 rounded ${token.class} ${
                  token.border ? 'border border-line' : ''
                }`}
              />
              <div>
                <p className="text-xs font-semibold">{token.name}</p>
                <p className="text-[11px] text-ink-2">
                  {isGiedi ? token.hexGiedi : token.hexArrakis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Scale */}
      <div className="flex flex-col gap-4 overflow-hidden">
        <h3 className="t-h3">Type Scale</h3>
        <div className="overflow-hidden">
          <p className="text-xs text-ink-2 mb-1">.t-wordmark (clamp 72-280px / wdth 125% / 800)</p>
          <p className="t-wordmark truncate">KIDAVI</p>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-h1 (clamp 44-104px / wdth 125% / 700)</p>
          <h1 className="t-h1">Heading One Sample</h1>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-h2 (clamp 32-60px / wdth 112% / 600)</p>
          <h2 className="t-h2">Heading two sample</h2>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-h3 (22px / wdth 100% / 600)</p>
          <h3 className="t-h3">Heading three sample</h3>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-body (17px / wdth 100% / 400 / max-w 70ch)</p>
          <p className="t-body">
            Body text sample at 17px. This sentence demonstrates the natural width and
            regular reading rhythm of the Archivo font family.
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-small (15px / wdth 100% / 400)</p>
          <p className="t-small">Body small text sample at 15px for secondary elements.</p>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-meta (13px / wdth 100% / 500 / ink-2)</p>
          <p className="t-meta">Meta text sample at 13px with ink-2 colour and slight tracking.</p>
        </div>
        <div>
          <p className="text-xs text-ink-2 mb-1">.t-epigraph (clamp 20-26px / wdth 87% / 300 / max-w 36ch)</p>
          <p className="t-epigraph">Epigraph text sample with condensed width.</p>
        </div>
      </div>

      {/* Buttons & Links */}
      <div className="flex flex-col gap-4">
        <h3 className="t-h3">Buttons &amp; Links</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <TextLink href="#sample-link">Explore case study</TextLink>
        </div>
      </div>

      {/* Epigraph Component */}
      <div>
        <h3 className="t-h3 mb-3">Epigraph Component</h3>
        <Epigraph
          text="Placeholder epigraph for layout testing only."
          attribution="Source name"
        />
      </div>

      {/* 70ch measure body paragraph */}
      <div>
        <h3 className="t-h3 mb-2">Measure Check (max-w 70ch)</h3>
        <p className="t-body border-l-2 border-accent pl-4">
          This paragraph is designed to test the measure and line length of the t-body
          class. When reading long-form text on digital screens, keeping line length at
          or below seventy characters ensures optimal reading comfort, preventing
          readers&apos; eyes from straining when moving from the end of one line to the
          beginning of the next line.
        </p>
      </div>
    </div>
  );
}

export default function DevTokensPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <main id="main">
      <ThemeSync />
      <Section spacing="tight">
        <Container className="flex flex-col gap-12">
          {/* 1. ThemeToggle Header */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              <h1 className="t-h1">Design Tokens</h1>
              <p className="t-meta mt-1">Dev-only verification page for tokens, font, and primitives</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="t-meta">Theme Toggle:</span>
              <ThemeToggle />
            </div>
          </header>

          {/* 2. Two side-by-side panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ThemePanel theme="arrakis" title="Arrakis (Light Mode)" />
            <ThemePanel theme="giedi" title="Giedi (Dark Mode)" />
          </div>

          {/* 3. Wordmark unfitted and fitted */}
          <div className="border border-line rounded p-6 md:p-8 bg-surface/50 flex flex-col gap-6">
            <h2 className="t-h2">Wordmark Component</h2>

            <div>
              <p className="t-meta mb-2">Wordmark fit={`{false}`}</p>
              <div className="overflow-x-auto py-2">
                <Wordmark text="KIDAVI" fit={false} />
              </div>
            </div>

            <div>
              <p className="t-meta mb-2">Wordmark fit={`{true}`} (full width inline SVG)</p>
              <div className="w-full border border-line bg-bg p-2 md:p-4 rounded">
                <Wordmark text="KIDAVI" fit={true} />
              </div>
            </div>
          </div>

          {/* 4. Tab Order & Focus Ring Check */}
          <div className="border border-line rounded p-6 md:p-8 flex flex-col gap-6">
            <h2 className="t-h2">Tab Order &amp; Focus Ring Check</h2>
            <p className="t-body">
              Tab through the elements below to verify the focus ring (2px solid accent with 3px offset) in both theme contexts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-theme="arrakis" className="bg-bg text-ink p-6 rounded border border-line flex flex-wrap items-center gap-4">
                <span className="t-meta w-full">Arrakis context:</span>
                <Button variant="primary">Focusable Button</Button>
                <TextLink href="#focus-link-light">Focusable Link</TextLink>
                <ThemeToggle />
              </div>

              <div data-theme="giedi" className="bg-bg text-ink p-6 rounded border border-line flex flex-wrap items-center gap-4">
                <span className="t-meta w-full">Giedi context:</span>
                <Button variant="primary">Focusable Button</Button>
                <TextLink href="#focus-link-dark">Focusable Link</TextLink>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
