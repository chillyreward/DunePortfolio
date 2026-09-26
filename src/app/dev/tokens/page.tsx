import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Epigraph } from '@/components/ui/Epigraph';
import { Wordmark } from '@/components/ui/Wordmark';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Realm, RealmMarker, ImperialRule, RealmGlyph } from '@/components/realm';
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
  { name: '--mark', class: 'bg-mark', hexArrakis: '#1E45C8', hexGiedi: '#7F97FF' },
  { name: '--line', class: 'bg-line', hexArrakis: '18% alpha', hexGiedi: '14% alpha', border: true },
];

const REALMS_SHOWCASE = [
  {
    name: 'arrakis' as const,
    title: 'Arrakis',
    role: 'Home hero, about teaser, contact, footer',
    description: 'The world everything happens on. Base sand ground, Ibad-blue mark.',
    bgHex: '#D9CBB0',
    markHex: '#1E45C8',
  },
  {
    name: 'fremen' as const,
    title: 'Fremen',
    role: 'Hackathons (home section and about page)',
    description: 'Building a lot from very little, under pressure. Stillsuit grey ground, sand gold mark.',
    bgHex: '#2A2D2E',
    markHex: '#DAA520',
  },
  {
    name: 'atreides' as const,
    title: 'Atreides',
    role: 'Own products (SmartChama, Saka)',
    description: 'Loyalty, self-determination, green-and-black banners. Deep forest slate ground, hawk gold mark.',
    bgHex: '#141C18',
    markHex: '#C5A059',
  },
  {
    name: 'corrino' as const,
    title: 'Corrino',
    role: 'Client work (Oppolia, Sucre Bushworks)',
    description: 'Imperial craft, commission, golden age of the Imperium. Imperial parchment ground, imperial gold mark.',
    bgHex: '#F5F0E6',
    markHex: '#A67608',
  },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
        <Container className="flex flex-col gap-16">
          {/* 1. Header */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-medium">Design System</p>
              <h1 className="t-h1 mt-1">Design Tokens</h1>
              <p className="t-meta mt-1">Dev-only verification page for tokens, font, primitives, and realms</p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/dev/content"
                className="text-sm font-medium text-ink-2 hover:text-ink underline underline-offset-4"
              >
                Go to /dev/content →
              </Link>
              <div className="flex items-center gap-3">
                <span className="t-meta">Theme Toggle:</span>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* 2. Realms of Dune Showcase */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
              <div>
                <h2 className="t-h2">Realms of Dune</h2>
                <p className="t-meta mt-1">
                  Four worlds from Frank Herbert&apos;s canon with dedicated grounds, markers, and canonical glyphs.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-surface border border-line rounded text-accent">
                WCAG 2.1 Contrast Gate: 26/26 PASSED
              </span>
            </div>

            {/* Glyph Row */}
            <div className="p-6 rounded border border-line bg-surface/40 flex flex-wrap items-center justify-around gap-6">
              <div className="flex flex-col items-center gap-2">
                <RealmGlyph realm="arrakis" size={28} className="text-ink" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Arrakis</span>
                <span className="text-[10px] text-ink-2">Desert Sun</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RealmGlyph realm="fremen" size={28} className="text-ink" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Fremen</span>
                <span className="text-[10px] text-ink-2">Crysknife</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RealmGlyph realm="atreides" size={28} className="text-ink" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Atreides</span>
                <span className="text-[10px] text-ink-2">Hawk Chevron</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RealmGlyph realm="corrino" size={28} className="text-ink" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Corrino</span>
                <span className="text-[10px] text-ink-2">Imperial Crown</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RealmGlyph realm="harkonnen" size={28} className="text-ink" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink">Harkonnen</span>
                <span className="text-[10px] text-ink-2">Black Sun Aperture</span>
              </div>
            </div>

            {/* 4 Realm Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {REALMS_SHOWCASE.map((realm) => (
                <Realm
                  key={realm.name}
                  name={realm.name}
                  className="p-8 rounded border border-line flex flex-col justify-between gap-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <RealmMarker realm={realm.name} />
                      <span className="text-[11px] text-ink-2 font-mono">{realm.bgHex}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{realm.title}</h3>
                      <p className="text-xs text-mark font-medium mt-0.5">{realm.role}</p>
                      <p className="text-sm text-ink-2 mt-2 leading-relaxed">{realm.description}</p>
                    </div>

                    <div className="p-4 bg-surface rounded border border-line space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-ink">Sample Heading</span>
                        <span className="text-mark font-medium">--mark</span>
                      </div>
                      <p className="text-xs text-ink-2 leading-relaxed">
                        Sample body text showing typography rendering against this realm&apos;s surface ground.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-bg text-mark border border-line">
                          Badge
                        </span>
                        <a href="#test" className="text-xs text-mark underline hover:opacity-80">
                          Realm link →
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-[11px] text-ink-2">
                    <span>Ground: {realm.bgHex}</span>
                    <span>Marker: {realm.markHex}</span>
                  </div>
                </Realm>
              ))}
            </div>

            {/* Imperial Rules showcase */}
            <div className="p-6 rounded border border-line bg-surface/30 space-y-4">
              <h3 className="t-h3">Imperial Rules (Realm Dividers)</h3>
              <p className="t-body text-sm text-ink-2">
                Decorative dividers separating site realms, with centered glyph or diamond pip:
              </p>
              <ImperialRule realm="arrakis" />
              <ImperialRule realm="fremen" />
              <ImperialRule realm="atreides" />
              <ImperialRule realm="corrino" />
              <ImperialRule />
            </div>
          </section>

          {/* 3. Base Modes (Arrakis / Giedi side-by-side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ThemePanel theme="arrakis" title="Arrakis (Light Mode)" />
            <ThemePanel theme="giedi" title="Giedi (Dark Mode)" />
          </div>

          {/* 4. Wordmark unfitted and fitted */}
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

          {/* 5. Tab Order & Focus Ring Check */}
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
