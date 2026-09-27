# Run 12 — Correction pass: back to the brief

Driven by `docs/portfolio/prompts/PROMPT-12-corrections.md` and the design review in `review/2026-09-27-10-30/findings.md`.

## Lenny's confirmations (2026-09-27)

| Question | Answer |
|---|---|
| Open to full-time roles | No |
| Beorchild year | 2026 |
| Beorchild team | Lenny Kidavi, Rachael, Shilla, Nanjoli |
| SmartChama stack includes TypeScript, Tailwind CSS, Next.js | Yes |
| Oppolia stack is Next.js, Tailwind CSS, TypeScript | Yes |
| Oppolia works "across East Africa" | No |
| Oppolia permission to show | Yes |
| Sucre Bushworks permission to show | Yes |
| Show NeuroGrowth publicly now | Yes (live: https://www.neurogrowthtech.com/) |
| Show Allenet Bakers publicly now | No |
| Keep X (Twitter) link | Yes |
| Availability wording | Freelance projects and internships |

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
