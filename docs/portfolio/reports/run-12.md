# Run 12 — Correction pass: back to the brief

Driven by `docs/portfolio/prompts/PROMPT-12-corrections.md` and the design review in `review/2026-09-27-10-30/findings.md`.

## Lenny's confirmations (2026-09-27)

| Question | Answer |
|---|---|
| Open to full-time roles | No |
| Beorchild year | 2026 |
| Beorchild team | Lenny Kidavi, Rachael, Shilla (corrected 2026-10-04) |
| SmartChama stack includes TypeScript, Tailwind CSS, Next.js | Yes |
| Oppolia stack is Next.js, Tailwind CSS, TypeScript | Yes |
| Oppolia works "across East Africa" | No |
| Oppolia permission to show | Yes |
| Sucre Bushworks permission to show | Yes |
| Show NeuroGrowth publicly now | Yes (live: https://www.neurogrowthtech.com/); client work, placeholder description accepted (2026-10-04) |
| Show Allenet Bakers publicly now | No |
| Keep X (Twitter) link | Yes |
| Availability wording | Freelance projects and internships |

Re-confirmed one by one on 2026-10-04 (Claude Code session). Also on 2026-10-04: keep the unconfirmed skills; drop Saka's "48+ estates"; experience "Independent software developer, 2025–present"; new skills JavaScript, Node.js (shipped) and C++, FastAPI, Web3 (coursework); no soft-skills line; CV gets a portrait and project thumbnails.

## 1. Audit (before)

| Check | Hits |
|---|---|
| `font-mono\|monospace\|ui-monospace` in `src` | 73 |
| `uppercase\|tracking-widest\|tracking-[0.2-9]` in `src` | 61 |
| `rounded-full\|lg\|xl\|2xl\|md` in `src` | 16 |
| `→\|↗\|arrow_forward` in `src` | 11 |
| hex colours in `src/**/*.tsx` | 94 |
| `green-\|emerald` in `src/**/*.tsx` | 3 (2 status dots, 1 dev-page string) |

Visibility bug found: the homepage and `/work` bypassed `isVisible()`, so client projects without permission (Oppolia, Sucre Bushworks) were listed in production, with case-study links that went nowhere. Counts ("All Projects (7)") included hidden projects.

## Changes by section

### 0. Visibility
- `getPublishedProjects()` and `getFeaturedProjects()` now go through `getProjects()` / `isVisible()`.
- Homepage selected work filters its slugs through `isVisible()`.
- `/work/[slug]` static params, metadata, 404 and "next project" all use `isVisible()`, so listings and case-study pages always agree.
- "All Projects (7) →" / "View All 7 Projects & Experiments →" replaced by `homePage.selectedWork.allLink` ("All work").

### 1. Hero
- `h1` visible text is **KIDAVI** only, in `.t-wordmark`; full name "Lenny Kidavi, developer and product builder" in an `sr-only` span.
- Portrait cutout centred and bottom-anchored: 78% of hero height on desktop; on mobile it fills a 58svh stage. Letters cross it at chest height (measured: no overlap with the face at 375/768/1024/1440/1920; no horizontal overflow).
- Giedi: portrait `grayscale brightness-125 contrast-[1.15]` plus a radial rim light behind the figure (the one allowed gradient). Wordmark blends `multiply` in arrakis, `difference` in giedi.
- Heat haze now wraps only the wordmark (brief §2), not the whole hero.
- Removed the monospace uppercase eyebrow and the green pulsing "Available" pill. Top-left shows `profile.education.location` in `.t-meta`.
- Buttons from `homePage.hero`: primary "View work", ghost "Download CV" (falls back to "Get in touch" if `cvPath` is unset).

### 2. Typography and components
- New `src/content/ui.ts` holds shared interface labels (project meta, hackathon meta, footer), so components carry no hard-coded copy.
- `ProjectRow`: type · year in `.t-meta` sentence case; role / team / stack as separate labelled `<dl>` cells; stack is a plain comma-separated line; links "Read case study", "Visit site", "Source code" with no arrows, 44px tall.
- `HackathonTimeline`: `<ol>` of `border-t` rows, year in `.t-h2`, placement in `.t-meta`; no boxes, badges or trophy icons. Lead photo is `photos[0]` (the winner's cheque).
- `CaseStudyLayout`: plain meta, stack as a line, key features as ruled list, no boxed sections; the "narrative in progress" placeholder is gone (the story section hides when empty, brief §7). Long single-word titles scale with `clamp(30px, 9.5vw, 104px)` so they fit at 320px.
- `/work` filter: underline tabs (44px), no count pills, no "Filter:" label; only types with visible projects are offered.
- Home about teaser: `hero.tagline` + education line from `profile.education` + "More about me"; portrait grayscale. Contact: "Work with me", availability line, large `mailto:` link, ghost WhatsApp button, socials as TextLinks. Contact cards and eyebrows removed.
- About page: draft badge, "Higher Education" chip, "In Good Academic Standing" and an unsourced coursework sentence removed; education as a plain ruled row; closing box removed; portrait grayscale.
- SkillGroups: comma-separated lists instead of chips. PhotoGallery, ContactForm, CV page: monospace and uppercase removed; gallery controls 44px.
- Shai-Hulud toast rebuilt on tokens (Fremen realm) instead of hard-coded hex; the worm SVG illustration keeps its own palette (justified exception).
- Header brand, nav, footer links: 44px tap height. Footer "Back to top ↑" arrow removed.
- Hero wordmark size `clamp(56px, 19vw, 280px)` (deviation from the 72px token minimum so KIDAVI fits at 320px; larger on desktop). Brief §2 now records the giedi rim-light gradient exception.
- Availability confirmed by Lenny: "Available for freelance projects and internships".

Audit after section 2 (excluding `src/app/dev` and OG images): monospace 0, stray uppercase 1 (RealmMarker, fixed in section 3), pill radius 0, arrows 0.

### 3. Realms
- `RealmGlyph` redrawn to §3B: arrakis two moons, fremen eye with filled pupil, atreides three Caladan waves, corrino diamond seal (filled inner diamond), harkonnen black sun (filled disc in a ring). Chevron, crysknife, crown and gear removed.
- `RealmMarker`: sentence-case labels from `ui.realms` ("Arrakis", "Fremen", "House Atreides", "House Corrino") in `.t-meta`, no uppercase/letterspacing. Still an inline row at all widths (the 1440 vertical rail from the design-review checklist is not built yet).
- Harkonnen rule: `giediRealmTokens` are now pure greys (fremen #111111, atreides #0A0A0A, corrino #181818; ink #F2F2F2, ink-2 #A3A3A3). The `[data-theme="giedi"] [data-realm]` override was already present with enough specificity; the green/violet tints came from the token values. `tokens:build` + `tokens:contrast`: all 26 checks pass.
- `realmFor(project)` in `projects.ts`: client → corrino, product/experiment → atreides.
- Home: selected work split into a House Atreides band (SmartChama, Saka, Gikuyu Translator) and a House Corrino band (Oppolia); "All work" below. Featured slugs per PROMPT-12: smart-chama, saka, gikuyu-translator, oppolia.
- `/work`: H1 on arrakis, then an Atreides band ("Products and experiments") and a Corrino band ("Client work"). The type filter was removed (bands do the grouping); `WorkFilter.tsx` deleted.
- Case studies render in `realmFor(project)` (Corrino for Oppolia and Sucre Bushworks).
- Corrino bands open with a 4px gold double rule (`border-double border-mark`) via `Realm`.
- Oppolia and Sucre Bushworks: `permission: true` (confirmed by Lenny 2026-09-27); their case studies now build.
- Homepage realm order: hero arrakis (no marker), selected work atreides + corrino, hackathons fremen, about arrakis, contact arrakis (no marker).

### 4. Content (2026-10-04, `fix: content back to confirmed facts`)
The confirmations above had been recorded but never applied; this section applies them.
- Beorchild: year 2026, team Lenny Kidavi, Rachael, Shilla.
- Oppolia: "across East Africa" removed. Saka: "48+ estates" removed (summary and highlight).
- Sucre Bushworks: "Camping gear, Kenyan campsites and guided trips, with a WhatsApp inquiry basket." (no "seamless").
- Red, White & Build summary limited to confirmed facts. Photo captions rewritten to describe what is visible (01 cheque, 02 certificate handover, 03 Credit Passport slide, 04 team in the audience, 05 ceremony, 06 after the event); lead image stays photo-01.
- Copy: home work lead "Products I've built and sites I've shipped for clients."; hackathon leads (home and about) removed; `/work` H1 "Work" with the same lead, metadata read from content; about headings Background, Education, Skills, Hackathons, What's next; bio rewritten in first person from the facts register; closing text without "high-impact".
- CV: phone shown as a WhatsApp link only; project type label from `ui.ts` (Gikuyu Translator was labelled "Client Work").
- NeuroGrowth: client, live URL, permission, placeholder tagline/summary. **Still `publish: false`**: it has no real screenshot (the cloud environment's network policy blocks neurogrowthtech.com). TODO(lenny): add `public/images/projects/neuro-growth/cover.webp`, then publish. When it goes live, `cv:check`'s "NeuroGrowth" assertion must be removed.

### 5. Visual fixes from the 2026-10-04 design review
- Hero: KIDAVI disappeared into the black blazer in arrakis (multiply). The wordmark now uses `mix-blend-difference` in both modes with a new `--wordmark` token (arrakis: bg minus ink, so it is exactly ink on sand and light sand over the blazer). The hero section gets `bg-bg` so the blend has a backdrop.
- Hackathon timeline: the header rule doubled the first row's rule; removed.
- Tap targets: hackathon project links get a 44px hit area; footer email and WhatsApp are 44px tall.
- Corrino mark `#A67608` → `#8D6407`: the House Corrino marker label failed axe AA (3.54:1). The contrast gate now requires 4.5:1 for every realm mark.

### 6. CV
- Merged the confirmed parts of Lenny's original resume: Experience (independent software developer, self-employed, Nairobi, 2025–present; bullets restate the facts register) and the new skills. Old-CV claims retired by the brief (2024 hackathon, Saka as an AI talent platform, old Vercel URLs, unverified impact lines, "Self-taught ML Engineer") stay out.
- Design: parchment header band with the monochrome portrait, screenshot thumbnail per project, headings with realm glyphs (Atreides for products, Corrino for client work, Fremen for hackathons) on gold rules, Ibad-blue links. All three skill groups.
- Print always uses the light palette (generated `@media print` token block), and the PDF prints backgrounds.
- `build-cv-pdf` and `playwright.config` fall back to Playwright's Chromium off Windows; the PDF script stops its server's whole process group on POSIX.

## Results (2026-10-04)

| Check | Before | After |
|---|---|---|
| monospace in `src` | 73 | 0 |
| uppercase / wide tracking | 61 | 2 (`.t-wordmark`, `.t-h1` in globals.css), plus OG image code (`og.tsx`, `opengraph-image.tsx`) |
| pill radius | 16 | 0 |
| glued arrows | 11 | 0 |
| hex colours in `.tsx` (excl. OG, icons, dev) | 94 | 2 files: `ShaiHulud.tsx` worm illustration, `layout.tsx` `themeColor` meta (justified) |
| green status dots | 2 | 0 |
| buzzwords / retired claims (seamless, high velocity, typed architectures, 48+, East Africa…) | — | 0 |

- `npx tsc --noEmit`: pass. `npm run lint`: no warnings or errors. `npm run build`: pass.
- `npm run tokens:contrast`: 29/29 pass.
- `npm run test:e2e`: 19/19 pass (axe AA on `/`, `/work`, `/about`, `/cv`, contact).
- `npm run cv:pdf` + `npm run cv:check`: 2 pages, all assertions pass (new: no bare phone number, no "48+", no "seamless").
- `npm run content:check`: passes; open TODO(lenny) items remain for roles, years, stacks, story paragraphs, NeuroGrowth cover, Allenet, epigraphs.

Known, not changed: the realm marker is still an inline row at 1440 (the vertical rail isn't built); OG images keep uppercase labels; Gikuyu Translator's "built to support indigenous language preservation and learning" is not in the facts register (TODO(lenny) to confirm).

## Screenshots

`docs/portfolio/reports/screenshots/run-12/`: `home`, `work`, `work-oppolia`, `about`, `cv` × `arrakis`/`giedi` × `375`/`1440` (20 full-page JPEGs).
