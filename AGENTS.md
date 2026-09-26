# Agent instructions — lenny-portfolio

1. Before any task, read `docs/portfolio/00-brief.md` in full. It is the source of truth for design, content and engineering rules.
2. Never invent project facts, metrics, dates, awards, quotes or testimonials. Unknown values stay `null` with `// TODO(lenny)`.
3. Never write Dune quote text. Epigraphs are typed by Lenny in `src/content/epigraphs.ts`.
4. Naming: folders and non-component files are lowercase kebab-case; React component files are PascalCase; import paths match file casing exactly.
5. Finish every task by running `npx tsc --noEmit`, `npm run lint` and `npm run build`, and report the results.
6. Frank Herbert canon only. Never use Brian Herbert/KJA concepts (no thinking-machine wars, no omnius, no eras outside Frank's six novels). Never use film logos or house crests — all glyphs are original geometric SVGs.
