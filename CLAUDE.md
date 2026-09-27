# Lenny Kidavi — portfolio (Claude Code instructions)

@AGENTS.md
@docs/portfolio/00-brief.md

The two imports above are the source of truth (shared with Antigravity). This file adds how to work in Claude Code.

## How to work here

- **Plan before multi-file changes.** For anything touching more than two files, or any design change, present a short plan (files, what changes, how you'll verify) and wait for approval.
- **Look at the result, don't assume it.** After any visual change, take Playwright screenshots of the affected pages in both modes (`arrakis`, `giedi`) at 375px and 1440px, open them, and compare against the brief before saying it's done. `/design-review` does the full version.
- **Verify every change:** `npx tsc --noEmit`, `npm run lint`, `npm run build`. Run `npm run test:e2e` before any push.
- **Content is data.** Copy lives in `src/content/`, never hard-coded in JSX. Never invent facts, metrics, dates, roles, stories or Dune quotes. Unknowns are `null` + `// TODO(lenny)`. If a request needs a fact that isn't in the brief's facts register or content files, ask Lenny.
- **Commit in small, described steps.** Never push, deploy, or change Vercel/Resend settings without asking. Never write secrets into files.

## Design guardrails (the drift to watch for)

The site has drifted towards a generic dark "terminal" template before. Reject these on sight:
- monospace text, uppercase eyebrow labels (uppercase is only for `.t-wordmark` and `.t-h1`)
- chips, pills, badges, status dots, boxed link cards, rounded cards (radius is 2px)
- `→` / `↗` glued to link text, buzzword copy ("robust architectures", "high velocity", "built for production")
- hard-coded colours outside `src/design/tokens.ts`; realm colours surviving in dark mode (the Harkonnen rule)
- a hero where KIDAVI isn't monumental or the portrait isn't clearly visible

## Useful commands

`npm run dev` · `npm run build` · `npm run content:check [-- --strict]` · `npm run images:manifest` · `npm run tokens:build` · `npm run tokens:contrast` · `npm run cv:pdf` · `npm run cv:check` · `npm run test:e2e` · `npm run test:smoke`

## Skills in this project

- `/design-review`: screenshot every page and audit it against the brief (read-only).
- `/add-project`: add a new project end to end.
- `/ship`: pre-deploy gate, then commit and push after approval.
