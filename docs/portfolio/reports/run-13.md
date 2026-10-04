# Run 13 — Final design: complete content, interactions, polish

Driven by PROMPT 13 (pasted by Lenny, 2026-10-04). Branch `final-design`, started from `main` after the PROMPT-12 pull request merged.

## Phase A — Interview

Lenny answered every question one at a time; answers went straight into `src/content/`.

- **NeuroGrowth:** client work (House Corrino), role Marketing Engineering, contribution "Led the full website upgrade", 2026, Next.js / TypeScript / Tailwind CSS, live `https://www.neurogrowthtech.com`, repo `github.com/Neuro-growth/neurogrowthwebsite`, featured, permission and publish on. Tagline and summary from Lenny's reference facts.
- **Credit lines:** SmartChama and Gikuyu Translator — "Built by my team and me; now part of NeuroGrowth's product line."
- **Gikuyu Translator:** Gemini API (translation) + ElevenLabs API (text-to-speech, live), full-stack developer, 2026.
- **Sucre Bushworks:** client work, full-stack developer, 2026, stack confirmed.
- **Oppolia:** full-stack developer, 2026.
- **Allenet Bakers:** not live yet; stays hidden.
- **Stories:** approved for SmartChama, Saka, Gikuyu Translator, NeuroGrowth, Oppolia, Sucre Bushworks. Drafted only from Lenny's answers and confirmed facts; no "what's next" paragraphs were invented.
- **Bio:** approved (`bioStatus: 'approved'`), NeuroGrowth line added.
- **Skills:** project-only tools stay on project stack lines, not in the skill groups.
- **Epigraphs** (typed by Lenny): home-about "Fear is the mind-killer.", about "The mystery of life isn't a problem to solve, but a reality to experience.", not-found "A person needs new experiences. They jar something deep inside, allowing him to grow." — all Frank Herbert, *Dune*.

## Phase B — Content

- NeuroGrowth published; homepage order SmartChama, Saka, Gikuyu Translator (Atreides) then NeuroGrowth, Oppolia (Corrino).
- No real NeuroGrowth screenshot yet: `neurogrowthtech.com` is blocked from the cloud environment. `cover` is now nullable; a shared `ProjectCover` shows an empty `--surface` frame with the site address (brief §9: no stand-in images). `capture-screenshots.mjs` already lists NeuroGrowth.
- Case studies: credit line, "Role and contributions" section, long titles fit at 320px.
- `/work` keeps the realm bands with no filter (Lenny's choice).
- CV regenerated (2 pages); `cv:check` and e2e now expect NeuroGrowth.

## Phase C — Interactions

Brief §2 now lists exactly what moves. All respect `prefers-reduced-motion`, are keyboard/screen-reader operable, and add **no npm dependencies**. Added client JS: **≈ 3.6 kB gzipped** (all `.next/static` chunks, before vs after).

1. Eclipse theme switch (View Transitions, 600ms circle from the toggle; instant fallback).
2. Hero depth on scroll (CSS scroll-driven animation only).
3. Realm compass in the (now sticky, desktop) header — one IntersectionObserver, 150ms fade, `aria-hidden`, xl+.
4. Search palette — Ctrl+K / ⌘K or Search button; native dialog, combobox/listbox ARIA, substring + initials matching; pages, projects, hackathons, actions (Download CV, Copy email, switch mode, WhatsApp). Data passed from the server as props.
5. Small touches: copy-email button + `role="status"` toast; sticky case-study contents with `aria-current`; mobile screenshot strip with CSS scroll-snap and "2 of 5" counts.

## Phase D — Polish

- Interface copy moved into `src/content/ui.ts`; mobile-menu eyebrow removed.
- Section rhythm on `py-section`; balanced H3s; `text-wrap: pretty` on body.
- 768px: brand on one line; hero switches to the side-by-side layout only from 1024px (intro no longer over the portrait).
- Full-width feature rules; phone-shaped screenshots shown whole in the shared frame.
- CV downloads as `Lenny-Kidavi-CV.pdf` everywhere.
- Share images rebuilt: real realm glyphs, sentence case, no stat block, chips or tagline; NeuroGrowth card included.
- `/design-review` verdict **on-brief**; follow-ups applied: vertical realm rail at xl, Saka role in sentence case ("Main founder and full-stack developer"), About teaser uses the first bio paragraph.
- Checked: no horizontal scroll at 375/768/1440/1920; focus ring in every band in both modes; form error and success states; empty epigraph slots leave no gaps.

## Phase E — Quality gate

| Check | Result |
|---|---|
| `npm run tokens:contrast` | 29/29 pass |
| `npx tsc --noEmit` | pass |
| `npm run lint` | no warnings or errors |
| `npm run build` | pass |
| `npm run test:e2e` | 23/23 pass (new: search palette keyboard flow, eclipse fallback with reduced motion, realm compass, NeuroGrowth route + credits) |
| `npm run cv:check` | 2 pages, all assertions pass |

Lighthouse (mobile, local production build, Lighthouse 12.8):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 90 (re-runs 94, 94) | 100 | 100 | 100 |
| `/work` | 96 | 100 | 100 | 100 |
| `/work/smart-chama` | 98 | 100 | 100 | 100 |
| `/about` | 95 | 100 | 100 | 100 |

Home's LCP is the hero portrait (2.6–3.0s on the throttled profile); it already loads with `priority`.

## After-launch checklist (`content:check --strict`: 19 open)

- NeuroGrowth: real screenshot (allow `neurogrowthtech.com` in the environment, then `node scripts/capture-screenshots.mjs`, `npm run images:manifest`, set `cover`).
- SmartChama: exact role; inception year if earlier than 2026; canonical domain (smartchama.tech vs Vercel); full stack.
- Saka: start year; teammate names (optional).
- Hackathons: teammates' surnames (optional); Beorchild organiser spelling; Beorchild prize (if any).
- Allenet Bakers: role, year, live URL, story, stack; publish after launch.
- Skills: final review of the three groups.

## Screenshots

`docs/portfolio/reports/screenshots/run-13/`: `home`, `work`, `work-smart-chama`, `work-neuro-growth`, `work-oppolia`, `about`, `cv`, `does-not-exist` × `arrakis`/`giedi` × `375`/`1440`; `home` also at `768` and `1920`; plus `eclipse-mid-1440.png`, `search-palette-1440.png`, `search-palette-375.png`, `og-images.png`.
