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
