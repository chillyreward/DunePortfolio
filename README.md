# Lenny Kidavi — Personal Portfolio

> Personal portfolio and engineering showcase for **Lenny Kidavi**, an independent software developer and Computer Science student at the Catholic University of Eastern Africa (CUEA) in Nairobi, Kenya.

The portfolio is designed around the visual language and thematic cosmology of **Frank Herbert's Dune**, featuring a multi-realm chromatic architecture, high-contrast typography, strict accessibility compliance (WCAG 2.1 AA), and zero-compromise static performance.

---

## The Realm System

The website is structured as a desert world traversing four canonical realms, with each section belonging to a specific House or culture from Frank Herbert's universe:

| Realm | Used On | Concept | Visual Treatment |
|---|---|---|---|
| **Arrakis** | Homepage hero, about teaser, contact, footer | The desert world where all journeys begin | Base warm sand (`#D9CBB0`), deep shadow typography (`#231D14`), Ibad blue accent (`#1E45C8`). |
| **Fremen** | Hackathons (home section & about page) | High-pressure innovation from minimal resources | Stillsuit grey background (`#2A2D2E`), sand gold glyphs (`#DAA520`), bone ink. |
| **Atreides** | Selected work & case studies | Formal discipline, green waters, hawk lineage | Deep forest slate background (`#141C18`), hawk gold markers (`#C5A059`), sage ink. |
| **Corrino** | Curriculum Vitae (`/cv`) | Imperial archives, formal pedigree | Imperial parchment (`#F5F0E6`), regal violet-slate ink (`#1C1824`), imperial gold (`#A67608`). |

### Modes
- **Arrakis (Light Mode)**: Standard daylight desert atmosphere.
- **Giedi Prime (Dark Mode)**: The black sun of House Harkonnen. Monochrome, stark contrast, sharp silhouettes.

---

## Tech Stack

- **Framework**: Next.js 14.2 (App Router, React 18, React Server Components & Server Actions)
- **Language**: TypeScript (strict mode, zero implicit `any`)
- **Styling**: Tailwind CSS v3.4, custom CSS variables generated from typed tokens
- **Typography**: Archivo (Google Fonts variable font locally optimized via `@next/font/local` and static TTF subsetting for OG generation)
- **Validation**: Zod v3 schemas for all content models
- **Testing & QA**: Playwright, `@axe-core/playwright` (WCAG 2.1 AA), Lighthouse CLI
- **Security**: Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options DENY, honeypot & time-trap anti-bot defenses
- **Deployment**: Vercel Edge Network, Resend (email delivery), Upstash Redis (rate limiting)

---

## Project Structure

```
├── assets/                    # Static source fonts (Archivo TTF subsets & licenses)
├── docs/                      # Project brief, reports, assets inventory
│   └── portfolio/
│       ├── 00-brief.md        # Single source of truth for design, content & rules
│       └── reports/           # Build & launch run logs, Lighthouse reports
├── public/                    # Static public assets (images, documents, icons)
│   ├── documents/             # lenny-kidavi-cv.pdf
│   └── images/                # Optimized WebP assets (portrait, projects, hackathons)
├── scripts/                   # Build-time verification & generation scripts
│   ├── build-tokens.ts        # Generates CSS variables from TypeScript design tokens
│   ├── check-contrast.ts      # Verifies WCAG AA/AAA contrast ratios for all tokens
│   ├── build-image-manifest.ts# Generates type-safe image dimension manifest
│   ├── content-check.ts       # Validates all content, epigraphs, and assets
│   ├── build-cv-pdf.ts        # Automated headless Chromium print-to-PDF generator
│   └── check-cv-pdf.ts        # PDF freshness & ATS text extraction verifier
├── src/
│   ├── app/                   # Next.js App Router pages, metadata & API/action routes
│   │   ├── actions/           # Contact form Server Action (sendContact)
│   │   ├── cv/                # ATS-friendly print/web CV
│   │   ├── work/              # Project gallery and dynamic case studies
│   │   └── not-found.tsx      # Branded Dune desert 404 page
│   ├── components/            # UI components (atoms, layout, realms, work, contact)
│   ├── content/               # Typed content source files (profile, projects, hackathons)
│   ├── design/                # Color tokens and realm definitions
│   └── lib/                   # Utility helpers (cn, env, nav, og)
└── tests/                     # Playwright automated test suites
```

---

## Local Development

### Prerequisites
- Node.js 18.17+ or 20.x
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/chillyreward/lenny-portfolio.git
cd lenny-portfolio

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server on localhost:3000
npm run dev

# Or build and run production server locally on port 3400
npm run build
npm run start -- -p 3400
```

### Prebuild Gates & Quality Assurance
The project enforces strict automated prebuild validation:
```bash
# Rebuild CSS tokens from TypeScript definitions
npm run tokens:build

# Verify all color contrast combinations against WCAG 2.1 AA/AAA
npm run tokens:contrast

# Build image dimension manifest for Next.js layout stability
npm run images:manifest

# Validate all content files, schemas, and TODO items
npm run content:check

# Run TypeScript static type checking
npx tsc --noEmit

# Run ESLint
npm run lint

# Run Playwright E2E and Axe-core accessibility test suites
npm run test:e2e
```

### CV Generation
The PDF version of the CV (`public/documents/lenny-kidavi-cv.pdf`) is compiled directly from the `/cv` route using Playwright print-to-PDF:
```bash
# Recompile production build and export PDF
npm run cv:pdf

# Verify PDF page budget (<= 2 pages) and ATS text readability
npm run cv:check
```

---

## Content Authoring Guide

All content is strictly decoupled from presentation components and lives in typed TypeScript files within `src/content/`:

1. **`src/content/profile.ts`**:
   Bio, contact links, education credentials, location, and portrait references.
2. **`src/content/projects.ts`**:
   Projects array. Each project includes title, slug, type (`product` | `client` | `experiment`), role, timeline, stack, metrics, live URLs, and case study narrative.
3. **`src/content/hackathons.ts`**:
   Competition history, award placement, team members, prize metadata, and event photos.
4. **`src/content/skills.ts`**:
   Skill groupings: Core Engineering, Tools & Infrastructure, and Focus Areas.
5. **`src/content/epigraphs.ts`**:
   Frank Herbert novel quotes and chapter headings manually typed by Lenny. Unknown quotes stay `null` with `// TODO(lenny)`.

> **Content Rule**: Never invent facts, metrics, awards, dates, or testimonials. Any unknown value must remain `null` with an accompanying `// TODO(lenny)` annotation.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local execution:

| Variable | Description | Required? | Default / Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL used for SEO, sitemap, OpenGraph metadata | Optional | Defaults to `https://lennydev.vercel.app` |
| `RESEND_API_KEY` | Resend API key for delivering contact form submissions | Optional (in dev) | If unset, contact action logs to console in development |
| `CONTACT_NOTIFICATION_EMAIL` | Destination email address for received contact messages | Optional | Defaults to `lennykidavik@gmail.com` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for distributed contact rate limiting | Optional | If unset, rate limiting is skipped gracefully |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | Optional | Paired with `UPSTASH_REDIS_REST_URL` |

---

## Frank Herbert Attribution & Canon Notice

- All epigraphs, chapter fragments, and quotes belong to **Frank Herbert** and are drawn exclusively from his original six novels (*Dune*, *Dune Messiah*, *Children of Dune*, *God Emperor of Dune*, *Heretics of Dune*, *Chapterhouse: Dune*).
- No Brian Herbert / Kevin J. Anderson concepts or terminology are used.
- All visual emblems and House glyphs (Arrakis Sun, Fremen Crysknife, Atreides Hawk, Corrino Crown, Harkonnen Black Sun) are **original geometric SVG vector art** designed for this portfolio. No movie logos, trademarks, or film crests are used.

---

## License

Code is licensed under the [MIT License](LICENSE). Content, personal photographs, and case study narratives copyright © Lenny Kidavi.
