import { Epigraph, EpigraphSchema, EpigraphSlot } from './schema';

// AGENTS MUST NEVER WRITE DUNE QUOTE TEXT.
// All epigraph quotes are chosen and typed exclusively by Lenny.

const rawEpigraphs: Epigraph[] = [
  {
    slot: 'home-about',
    quote: '', // TODO(lenny): type Dune epigraph quote for home-about
    attribution: 'Frank Herbert, Dune',
  },
  {
    slot: 'about',
    quote: '', // TODO(lenny): type Dune epigraph quote for about page
    attribution: 'Frank Herbert, Dune',
  },
  {
    slot: 'not-found',
    quote: '', // TODO(lenny): type Dune epigraph quote for 404 page
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
