---
name: design-review
description: Screenshot every page of the portfolio in both modes at mobile and desktop widths and audit it against the Dune brief. Use when Lenny asks whether the site looks right, before shipping, or after any visual change. Read-only.
---

# Design review

Read-only: don't edit source files. Output a findings report.

## 1. Capture

1. `npm run build`, then start `npm run start -- -p 3400` in the background.
2. With Playwright (Chromium), save full-page screenshots to `review/<timestamp>/` (gitignored) named `<page>-<arrakis|giedi>-<375|1440>.png` for `/`, `/work`, every production-visible `/work/<slug>`, `/about`, `/cv`, `/does-not-exist`. Set dark mode with `page.addInitScript(() => localStorage.setItem('theme','dark'))`. Wait 3s after load (the hero haze must have finished).
3. Also capture `/` at 1440px 100ms after load (haze mid-effect) and at 1920px.
4. Stop the server.

## 2. Look

Open every screenshot and judge it against `docs/portfolio/00-brief.md`. Check at least:

**Hero:** visible text is only KIDAVI at wordmark scale (spans most of the width); the portrait is large and clearly visible in both modes; letters cross it at chest height (multiply on sand, difference on black); location in `.t-meta`; one primary button.

**Typography:** Archivo only; no monospace; uppercase only on the wordmark and H1s; body line length ≤ 70ch; hierarchy clear.

**Realms:** correct realm per section (brief §6); markers read `Arrakis`, `Fremen`, `House Atreides`, `House Corrino` with the exact §3B glyphs (two moons, eye, waves, diamond seal); vertical rail at 1440, inline row at 375; in `giedi` every band is black and white and only the blue accent survives; Corrino sections use the gold double rule.

**Anti-patterns:** chips, pills, badges, status dots, boxed link cards, rounded cards, glued arrows, gradients (except the documented portrait rim light), shadows, hard-coded colours, eyebrows on every heading.

**Content:** every visible claim is in the facts register or content files; no buzzwords; hidden projects don't appear; hackathon lead photo is the winner's cheque; captions describe what's visible.

**Layout and a11y:** no horizontal scroll; nothing overlapping the face; tap targets ≥ 44px; contrast looks right; focus states visible (spot-check by tabbing on `/`).

## 3. Report

Write `review/<timestamp>/findings.md` and summarise in chat:
- a verdict in one line (on-brief / drifting / off-brief);
- findings ordered by impact, each with page, mode, width, the screenshot file, what's wrong, the brief section it breaks, and the fix (file and change);
- what's working well (briefly).

Ask Lenny which fixes to apply. Don't apply any yourself.
