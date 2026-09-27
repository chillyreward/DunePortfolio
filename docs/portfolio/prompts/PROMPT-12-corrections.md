# PROMPT 12 — Correction pass: back to the brief

> **Before you paste, fill in this block** (change each answer; delete the wrong option):
>
> ```
> LENNY CONFIRMS
> - Open to full-time roles: YES / NO
> - Beorchild year: ____ (or UNKNOWN)
> - Beorchild team: solo / with ____ (or UNKNOWN)
> - SmartChama stack includes TypeScript, Tailwind CSS, Next.js: YES / NO
> - Oppolia stack is Next.js, Tailwind CSS, TypeScript: YES / NO
> - Oppolia works "across East Africa": YES / NO
> - Oppolia permission to show: YES / NO
> - Sucre Bushworks permission to show: YES / NO
> - Show NeuroGrowth publicly now: YES / NO
> - Show Allenet Bakers publicly now: YES / NO
> - Keep X (Twitter) link: YES / NO
> ```
>
> Then paste everything below the line into Antigravity, in the portfolio project.

---

You are doing a correction pass on Lenny Kidavi's live portfolio. It has drifted from `docs/portfolio/00-brief.md` towards a generic dark "terminal" template. **Read `AGENTS.md` and the brief in full first.** The brief wins over what's currently in the code. Apply Lenny's answers in the block above as confirmed facts.

Work in the order below. Commit after each numbered section with the message given. Don't add features.

## 1. Audit (no changes yet)

Run and record in `docs/portfolio/reports/run-12.md`:
- `grep -rn "font-mono\|monospace\|ui-monospace" src` (monospace is banned)
- `grep -rn "uppercase\|tracking-widest\|tracking-\[0\.[2-9]" src` (uppercase is allowed **only** on `.t-wordmark` and `.t-h1`)
- `grep -rn "rounded-full\|rounded-lg\|rounded-xl\|rounded-2xl\|rounded-md" src` (radius is 2px everywhere)
- `grep -rn "→\|↗\|arrow_forward" src` (no arrows glued to link text; the only allowed icon is the external-link hint)
- `grep -rn "#[0-9a-fA-F]\{3,6\}" src --include=*.tsx` (no hard-coded colours outside `src/design/tokens.ts`, OG images and icons)
- Any green (`green`, `emerald`, `#22c55e`-like) status dots or badges.
- Every string rendered in JSX that is **not** from `src/content/`.

## 2. Hero — restore the signature (commit: `fix: hero — monumental KIDAVI crossing the portrait`)

Rebuild to brief §2 and PROMPT 03's spec:
- The `h1` visible text is **KIDAVI** only, in `.t-wordmark` (`clamp(72px, 17vw, 280px)`, expanded 125%, weight 800), with the full name "Lenny Kidavi, developer and product builder" in an `sr-only` span.
- Portrait cutout large and dominant: ≈ 78% of hero height on desktop, **≈ 58% on mobile**, centred and bottom-anchored. The letters' baseline crosses it at chest height.
- **Giedi (dark) visibility fix:** the black blazer disappears into black. In `giedi` only, give the portrait `filter: grayscale(1) brightness(1.25) contrast(1.15)` and a soft rim light behind it: a radial highlight `radial-gradient(closest-side, rgb(var(--ink) / 0.10), transparent)` sized to the figure, placed behind the cutout (this is the one gradient allowed; note it in the brief). Keep `mix-blend-mode: difference` on the wordmark in `giedi` and `multiply` in `arrakis`.
- Remove the monospace location/role eyebrow and the green "Available" pill from the hero. Top-left shows `profile.location` in `.t-meta` (sentence case, Archivo).
- Intro text is `profile.intro` exactly. Buttons: primary "View work", ghost "Get in touch" (or "Download CV" if `cvPath` is set), from `src/content/home.ts`.
- Verify at 375 and 1440px in both modes: the portrait is clearly visible and the letters cross it.

## 3. Typography and components — remove the template look (commit: `fix: one typeface, sentence case, no chips or cards`)

- **Remove monospace everywhere.** Replace with Archivo `.t-meta` (13px, weight 500, sentence case, `ink-2`).
- **Eyebrow labels** ("DIRECT CONTACT", "BACKGROUND & EDUCATION", "PRODUCT / 2026" etc.): delete them where they only decorate a heading; where they carry information (project type and year), render them as `.t-meta` sentence case: "Product · 2026".
- **Stack chips** → a plain comma-separated line in `.t-small` ("Next.js, Supabase, Cloudinary…"), per brief §5 and the `ProjectRow` spec.
- **Hackathon cards** → the `HackathonTimeline` spec from PROMPT 03 and 05: an `<ol>` of rows with `border-t border-line`, year in `.t-h2`, placement in `.t-meta` ("Winner", "Second place"), no boxes, no trophy icons, no badges. Prize and date as plain text.
- **Contact link cards** ("Quick chat / WhatsApp ↗" boxes) → the PROMPT 03 contact spec: email as a large `mailto:` link, a ghost "WhatsApp" button, socials as plain `TextLink`s.
- **Arrows:** remove every `→` and `arrow_forward` from link labels ("Read case study", "All work", "More about me"). External links keep only the small external-link icon with the visually hidden "(opens in a new tab)".
- **Radius:** 2px on images, buttons and inputs; no pills.
- **About portrait:** add `grayscale` in both modes.

## 4. Realms — match §3B exactly (commit: `fix: realm markers, glyphs and the Harkonnen rule`)

- Marker labels: `Arrakis`, `Fremen`, `House Atreides`, `House Corrino`, sentence case, Archivo `.t-meta` (not uppercase, not monospace).
- `RealmGlyph` geometry must match brief §3B exactly: arrakis = two moons, fremen = eye with filled pupil, atreides = three Caladan waves, corrino = diamond seal, harkonnen = black sun. Replace the chevron, flame and any other substitute.
- **Harkonnen rule:** in `giedi`, every realm band must be pure black/white (`giediRealm` tokens). Inspect the Atreides band in dark mode: if it's still green, the generated CSS is missing the `[data-theme="giedi"] [data-realm]` override or its specificity is too low. Fix it in `scripts/build-tokens.ts`, re-run `npm run tokens:build` and `npm run tokens:contrast`.
- Check that the homepage realms are: hero `arrakis` (no marker), selected work `atreides`, hackathons `fremen`, about `arrakis`, contact `arrakis` (no marker).

## 5. Content — invent nothing (commit: `fix: content back to confirmed facts`)

Apply Lenny's confirmations from the block above, then:
- **Copy strings:** restore brief voice. Replace these with the `src/content` strings from the original prompts (and move any JSX strings into content):
  - "A selection of web products, client platforms, and hackathon prototypes built for production." → `home.workAside` "Products I've built and sites I've shipped for clients."
  - "View All 7 Projects & Experiments", "All Projects (7)" → `home.workAllLink` "All work" (no count).
  - "Building under high velocity, rapid iteration, and intense pressure." → delete (no subtitle).
  - "…I prioritize robust architectures, typed systems, and measurable real-world utility." → the about teaser uses `profile.intro` + the education line + "More about me" (PROMPT 03 spec).
  - "Let's build something together." heading → `home.contactHeading` "Work with me".
  - Availability line: use `profile.availability`. Mention internships or full-time roles **only** if Lenny confirmed them above.
- **Facts:** for each item Lenny marked NO or UNKNOWN, set the field back to `null` with a `// TODO(lenny)` comment (Beorchild `year`, `team`; stacks; "across East Africa"). Hackathon descriptions not in the facts register (e.g. "demonstrating digital savings group management…") are removed unless they're visibly true from the live SmartChama site.
- **Visibility:** apply Lenny's permission answers (`permission`, `publish`). Confirm `isVisible` enforces the production rules, then check that the homepage shows the **featured** projects (SmartChama, Saka, Oppolia if permitted, Gikuyu Translator) and that `/work` shows only production-visible projects.
- **Hackathon photos:** the Red, White & Build lead image is `photo-01` (the winner's cheque). Captions must describe what's visibly in each photo; remove "Award ceremony with U.S. Embassy officials" unless that photo actually shows the award.
- Run `npm run content:check` and record the output.

## 6. Verify, regenerate, deploy (commit: `chore: regenerate CV after corrections`)

1. Re-run the audit greps from section 1: monospace, stray uppercase, pills, glued arrows and hard-coded colours should all be gone (list any justified exceptions).
2. `npm run cv:pdf` and `npm run cv:check` (the content changed, so the CV must too).
3. `npx tsc --noEmit`, `npm run lint`, `npm run test:e2e` (update tests only where they asserted the old, wrong markup).
4. Full-page screenshots to `docs/portfolio/reports/screenshots/run-12/`: `/`, `/work`, one case study, `/about` in **both modes** at **375 and 1440px**.
5. `git push`. Vercel redeploys automatically. Confirm the live site reflects the changes.

Finish `run-12.md` with: what changed per section, the before/after grep counts, `content:check` output, test results, and the screenshot list.
