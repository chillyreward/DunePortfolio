---
name: add-project
description: Add a new project to Lenny's portfolio end to end — facts interview, content entry, screenshots, image manifest, case study check. Use when Lenny says he built something new or wants a project added or updated.
---

# Add a project

## 1. Interview (ask, don't guess)

Ask Lenny in one message, and wait:
- project name, and a one-sentence summary in his words
- type: own product, client, or team (and whose team)
- live URL and repo URL (or "private")
- his role and 2–5 concrete contributions
- stack (only what he actually used)
- year
- for client work: does he have permission to show it?
- which realm it belongs to (default: House Atreides, like all work)
- any hackathon or award connection
- optional: 2–4 short story paragraphs (why it exists, what was hard, what's next)

Anything he doesn't answer stays `null` with `// TODO(lenny)`.

## 2. Content

- Add the entry to `src/content/projects.ts` with a new kebab-case slug (add it to the `ProjectSlug` enum in `schema.ts`).
- Set `order`, `featured` (ask), `publish`, `permission`.
- Features only from what's visibly on the live site or confirmed by Lenny.

## 3. Images

- Add the `{ slug, url }` to `scripts/capture-screenshots.mjs` and run it for this slug only (desktop 1440×900 @2x, mobile 390×844 @3x, 4s extra wait; check the captures show the real page).
- Any images Lenny provides: import with `scripts/import-assets.mjs`, then `git mv` into `public/images/projects/<slug>/` using the naming rules (`cover`, `desktop-01`, `mobile-01`, …).
- `npm run images:manifest`; reference images with `img()` and specific alt text.

## 4. Verify

- `npx tsc --noEmit`, `npm run build` (the new slug must appear under `/work/[slug]` if visible), `npm run content:check`.
- Screenshot `/work` and the new case study in both modes at 375 and 1440px and look at them.
- If the CV includes this project, tell Lenny to run `npm run cv:pdf` (or do it if he agrees).
- Commit: `feat(content): add <project name>`.
