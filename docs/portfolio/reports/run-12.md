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
