import { Epigraph, EpigraphSchema, EpigraphSlot } from './schema';

// AGENTS MUST NEVER WRITE DUNE QUOTE TEXT.
// All epigraph quotes are chosen and typed exclusively by Lenny.

const rawEpigraphs: Epigraph[] = [
  {
    slot: 'home-about',
    quote: 'Fear is the mind-killer.', // Typed by Lenny 2026-10-04
    attribution: 'Frank Herbert, Dune',
  },
  {
    slot: 'about',
    quote: "The mystery of life isn't a problem to solve, but a reality to experience.", // Typed by Lenny 2026-10-04
    attribution: 'Frank Herbert, Dune',
  },
  {
    slot: 'not-found',
    quote: 'A person needs new experiences. They jar something deep inside, allowing him to grow.', // Typed by Lenny 2026-10-04
    attribution: 'Frank Herbert, Dune',
  },
];

export const epigraphs: Epigraph[] = rawEpigraphs.map((e) => EpigraphSchema.parse(e));

export function getEpigraph(slot: EpigraphSlot): Epigraph | undefined {
  const item = epigraphs.find((e) => e.slot === slot);
  if (!item || !item.quote.trim()) {
    return undefined;
  }
  return item;
}
