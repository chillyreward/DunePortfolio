# Lenny Kidavi — Portfolio Brief (v1, "Arrakis")

Source of truth for every portfolio prompt. If a prompt and this brief disagree, the prompt wins for that step only; update this brief if the change is permanent.

---

## 1. What this site is

The personal portfolio of **Lenny Kidavi** (also known online as Lenny Navwani): Computer Science student at CUEA in Nairobi, independent developer who ships real products for real businesses, hackathon winner (Red, White & Build, 2026) and runner-up (Beorchild), working toward Machine Learning Engineering.

- **Primary job:** show freelance clients and collaborators that Lenny designs and builds complete products, with live links as evidence.
- **Secondary job:** show recruiters, and later master's admissions (MIT, CMU and similar), technical depth and a clear direction toward ML.
- **Positioning line:** "I design and build products end to end, and I'm working toward machine learning engineering." Confident, not senior-engineer overclaiming.

## 2. Design direction — "Arrakis"

Inspired by Denis Villeneuve's Dune films: monumental scale, emptiness, harsh light, a tiny human against vast structures. Built from these references:

| Reference | What we take |
|---|---|
| Alex Graham hero | Giant name set across a monochrome portrait; the portrait sits inside the wordmark. |
| Norm Interior | Project index as large paired screenshots with a quiet metadata row under each (type, role, stack, year). Full-width wordmark closing the footer. Restraint and emptiness. |
| D.Nova, David Clark | Section order for About and experience. **Not** their stat blocks. We never show numbers we can't verify. |
| pamidordesign.co, avecanni.studio, gallery-play.be, sibaldesign.com, noahlesage.com | Pacing, whitespace, and case-study presentation. Review live for motion and interaction when building the relevant section. |

Dune is expressed in the **visual language**, not in jargon:
- No film stills, no Dune logo or title lettering, no house sigils, no fan art. Everything is original.
- No "spice", "Fremen", "Kwisatz" etc. in UI copy or headings.
- The only Dune text on the site is the **epigraphs** (short quotes Lenny supplies himself, always attributed). See §8.

Rules that keep it disciplined:
- **One memorable thing:** the hero wordmark. Everything else is quiet.
- **One typeface:** Archivo (variable, with a width axis). Width does the expressive work. No second family, no monospace labels.
- **One signature motion:** on first load the hero wordmark resolves out of a heat-haze distortion (~1.4s, once). Disabled under `prefers-reduced-motion` and on coarse pointers (simple opacity fade instead). Nothing else animates on its own; only user-triggered transitions (hover, focus, open/close).
- No all-caps labels, no eyebrow text above every heading, no `01 / 02` numbering unless the content really is a sequence (the hackathon timeline is), no `→` glued onto link text, no gradients, no glow, no drop shadows.
- Emptiness is a feature: generous section spacing, lots of sand.

## 3. Modes

| Mode | Name in code | Feel |
|---|---|---|
| Light (default) | `arrakis` | Sand page, shadow-brown ink, Ibad-blue accent |
| Dark | `giedi` | Pure black and white, like the black-sun arena in Part Two. Lifted blue accent |

Default follows the system preference; the user can override with a toggle (moon icon). Stored in localStorage via `next-themes`, applied as `data-theme` on `<html>`.

## 4. Tokens

### Colour

| Token | `arrakis` | `giedi` | Use |
|---|---|---|---|
| `--bg` | `#D9CBB0` sand | `#000000` | Page background |
| `--surface` | `#EFE7D8` bone | `#161616` | Raised surfaces: form panel, code blocks, image placeholders |
| `--ink` | `#231D14` shadow | `#F2F2F2` | Headings and body text (10.4:1 / 18:1) |
| `--ink-2` | `#574E40` stone | `#A3A3A3` | Secondary text (5.1:1 / 8.3:1) — min 14px |
| `--accent` | `#1E45C8` Ibad blue | `#7F97FF` | Links, focus ring, primary button, the one accent per view (4.8:1 / 7.8:1) |
| `--accent-ink` | `#FFFFFF` | `#000000` | Text on accent fill |
| `--spice` | `#C8801A` | `#C8801A` | **Never text.** Only image duotones, texture, tiny decorative marks |
| `--line` | `rgb(35 29 20 / 0.18)` | `rgb(255 255 255 / 0.14)` | Dividers, input borders |
| `--focus` | `--accent` | `--accent` | 2px outline, 3px offset, on every focusable element |

### Type — Archivo (Google Fonts via `next/font`, axes: `wght` + `wdth`)

| Role | Size | wdth / wght / line-height / tracking | Case |
|---|---|---|---|
| Wordmark (hero, footer) | `clamp(72px, 17vw, 280px)` | 125 / 800 / 0.85 / -0.02em | UPPERCASE |
| H1 (page title) | `clamp(44px, 7vw, 104px)` | 125 / 700 / 0.95 / -0.02em | UPPERCASE |
| H2 | `clamp(32px, 4.4vw, 60px)` | 112 / 600 / 1.02 / -0.015em | Sentence case |
| H3 | 22px | 100 / 600 / 1.2 / -0.01em | Sentence case |
| Body | 17px | 100 / 400 / 1.6 / 0 | — |
| Body small | 15px | 100 / 400 / 1.55 / 0 | — |
| Meta (project metadata, dates) | 13px | 100 / 500 / 1.4 / 0.01em | Sentence case |
| Epigraph | `clamp(20px, 2vw, 26px)` | 87 / 300 / 1.4 / 0 | As written |

Uppercase is used **only** for the wordmark and H1s. Line length ≤ 70ch for body text.

### Layout

- Container: `max-width: 1440px`, horizontal padding `clamp(20px, 4vw, 64px)`.
- Grid: 12 columns, gap 24px (16px below 640px).
- Section vertical padding: `clamp(96px, 12vw, 192px)`.
- Radius: `2px` on images, buttons, inputs. Nothing is pill-shaped or rounded-card.
- Buttons: 48px tall, 15px/500, padding 0 20px. Variants: `primary` (accent fill), `ghost` (ink text, 1px `--line` border). Max one `primary` per view.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).

## 5. Components (built across prompts 01–06)

| Component | Spec |
|---|---|
| `Container`, `Section`, `Grid` | Layout primitives from §4. |
| `Wordmark` | Real text (not an image) sized by its container; used in hero and footer. |
| `HeroHaze` | Client component wrapping the hero wordmark with the SVG heat-haze filter (`feTurbulence` + `feDisplacementMap`, displacement scale 28 → 0). |
| `Portrait` | Monochrome portrait placed behind/inside the wordmark (`mix-blend-mode: multiply` in `arrakis`, `screen` in `giedi`). |
| `SiteHeader` | Name left; Work, Hackathons, About, Contact; theme toggle; "Download CV" ghost button. Mobile: name + menu button opening a full-screen sheet. |
| `SiteFooter` | Contact links, socials, copyright, full-width "KIDAVI" wordmark. |
| `ProjectRow` | Norm Interior pattern: one large + one small screenshot, title, meta row (type · role · stack · year rendered as separate labelled cells, not a dotted string), "View case study" and "Visit site" links. |
| `CaseStudyLayout` | Hero screenshot, overview, problem, role and contributions, stack, key features, links, gallery, next project. |
| `HackathonTimeline` | Chronological list (real sequence, so numbering is allowed): event, organiser, project, placement, date, certificate thumbnail. |
| `SkillGroups` | Three honest groups: "Shipped with", "Used in coursework and experiments", "Currently learning". |
| `Epigraph` | Quote + attribution. Renders nothing if the quote text is empty. |
| `ThemeToggle` | Moon icon button, `aria-label` describes the action ("Switch to dark mode"). |
| `ContactForm` | Name, email, message; server action; Resend. Built in the contact prompt. |

## 6. Pages

| Route | Sections |
|---|---|
| `/` | Hero (wordmark + portrait + one-line intro + CV) · Selected work (3–4 ProjectRows) · Hackathons (timeline) · About teaser + epigraph · Contact |
| `/work` | Page H1 · all projects as ProjectRows, filterable by type (client site, own product) |
| `/work/[slug]` | CaseStudyLayout, statically generated (`generateStaticParams`) |
| `/about` | Story · education · SkillGroups · hackathons (compact) · epigraph · CV download |
| `/cv` | Print-optimised CV rendered from the same content files; source of the downloadable PDF |
| `not-found` | Branded 404 with an epigraph slot |

## 7. Content rules

- All copy lives in `src/content/`, never hard-coded in JSX.
- **Never invent** features, technologies, user numbers, outcomes, dates, awards, or testimonials. Unknown fields are `null`, marked `// TODO(lenny)`, and the UI hides them. `npm run content:check` lists every open TODO.
- Case studies only publish when `publish: true`. Client work also needs `permission: true`.
- Skills are grouped by honest proficiency (§5 SkillGroups); nothing is labelled "expert".
- Voice: first person, plain, specific. No "passionate about technology", no "seamless", "leverage", "cutting-edge".
- Contact: email shown as text; phone offered only as a WhatsApp link (`https://wa.me/254714301086`), not printed as a bare number.
- Icons: `lucide-react` only. No emojis in the UI.

### Facts register (v1)

Confirmed:
- Name: Lenny Kidavi; online alias Lenny Navwani.
- Education: BSc Computer Science, Catholic University of Eastern Africa (CUEA), 2025–2028 (expected graduation 2028). Based in Lang'ata, Nairobi.
- Email: lennykidavik@gmail.com. WhatsApp: +254 714 301 086.
- GitHub: https://github.com/chillyreward · LinkedIn: https://www.linkedin.com/in/lenny-kidavi-4693ba355 · Fiverr: https://www.fiverr.com/lennynavwani · Current site: https://lennydev.vercel.app
- **SmartChama** — shipped. Digital savings and loan management for African savings groups (chamas), including a real Solidity/Ethereum smart-contract layer. Live: https://www.smartchama.tech. Repo: github.com/chillyreward/SmartChama.
- **Saka** — local professionals marketplace: find verified local tradespeople and service providers near you, starting in Nairobi. It began as a professional-services finder and has never been an AI talent platform (the old CV's description is wrong and must not be reused). Inquiry-first, direct M-Pesa payment to pros, no commission. Lenny is the main founder, team of five. Live: https://sakahapa.vercel.app. Repo private. Stack: Next.js 14 App Router, Supabase, Cloudinary, Google Maps, Zustand, TanStack Query, next-pwa, Upstash Redis, Vercel.
- **Oppolia Woodworths Kenya** — client website for a luxury fitted-cabinetry and interiors company. Live: https://www.oppoliakenya.co.ke
- **Sucre Bushworks** — website for camping gear, Kenyan campsites and guided trips, with a WhatsApp inquiry basket. Live: https://sucre-bushworks.vercel.app
- **Gikuyu Translator** — AI translation from English and Kiswahili into Gikuyu. Live: https://gikuyu-translate.vercel.app. Repo: github.com/chillyreward/New-translator.
- **Hackathon 1** — **Winner**, Red, White & Build US–Kenya Hackathon (AI & Tech), U.S. Embassy Kenya, with SmartChama. Prize ceremony 19 February 2026, $1,000 prize. In person, Nairobi. Team: Lenny Kidavi, Rachael, Shilla, Nanjoli. (Note: the old CV's "US Embassy Hackathon 2024" is wrong and must not be reused.)
- **Hackathon 2** — **Second place**, Beorchild hackathon, with SmartChama. Online. No certificate or photos.

TODO(lenny):
- SmartChama: which URL is canonical (smartchama.tech vs smart-chama10.vercel.app); full stack; Lenny's exact role; how to credit its relationship to NeuroGrowth.
- Gikuyu Translator: what powers translation (model/API); whether text-to-speech is live; role; NeuroGrowth credit.
- NeuroGrowth: live link, role, permission to publish.
- Allenet Bakers: live link (allenetbakers.com?) once launched; publish after launch only.
- Oppolia, Sucre Bushworks: role, stack, year, repo (or private), permission to publish.
- Hackathons: teammates' surnames (optional); Beorchild official spelling, date and team; whether 'The Credit Passport' (shown on screen when presenting at Red, White & Build) is a SmartChama feature.
- Skills: sort every technology into the three SkillGroups.
- Keep or drop X (x.com/Lenny_kidavi).
- Epigraph texts (§8).

## 8. Epigraphs

- Short Dune quotes chosen and typed by Lenny into `src/content/epigraphs.ts`. Agents must **not** write or fill in quote text themselves.
- Max three on the whole site. Slots: `home-about`, `about`, `not-found`.
- Always attributed (for example "Frank Herbert, Dune" or the film title). Never used as a heading or a button label.

## 9. Imagery

- Real screenshots and photos only. No stock photos, no AI-generated people, no fabricated certificates.
- Source images arrive in `public/images/_inbox/` (see PROMPT 00) and are then placed by slug:
  `public/images/portrait/`, `public/images/projects/<slug>/`, `public/images/hackathons/<id>/`.
- Slugs: `smart-chama`, `saka`, `oppolia`, `sucre-bushworks`, `gikuyu-translator`, `neuro-growth`, `allenet-bakers`.
- Hackathon folder IDs: `red-white-build`, `beorchild`.
- All images through `next/image` with explicit `width`/`height` or `fill` + `sizes`; aspect ratio always preserved; real `alt` text.
- Portrait gets a monochrome treatment; project screenshots are shown as-is.

## 10. Engineering rules

- Server Components by default. `'use client'` only where interaction needs it: `ThemeToggle`, `HeroHaze`, mobile menu, contact form UI. Keep client components small and leaf-level; never mark a layout or page as a client component.
- No `useSearchParams` in this project unless wrapped in `<Suspense>`; filtering on `/work` uses state or links, not search params, unless a prompt says otherwise.
- Dynamic routes: `params` come from `generateStaticParams`; unknown slugs call `notFound()`.
- Server actions live in `src/app/**/actions.ts` files that start with `'use server'`, and validate input with Zod.
- Metadata: `metadataBase` set in the root layout from `NEXT_PUBLIC_SITE_URL` (never let canonical/OG URLs resolve to localhost).
- Casing: see the naming rule in PROMPT 00 Step 4.
- Accessibility floor: visible focus everywhere, keyboard-operable menu and toggle, `prefers-reduced-motion` respected, contrast per §4, one `<h1>` per page, 44px minimum touch targets.
