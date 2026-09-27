const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/**
 * Formats an ISO date string (YYYY-MM or YYYY-MM-DD) into 'Month Year'
 * without timezone shifting.
 */
export function formatMonthYear(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length < 2) return iso;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${MONTHS[monthIdx]} ${year}`;
  }
  return iso;
}

/**
 * Joins a list of items with commas and 'and'.
 */
export function formatList(items: string[]): string {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * Formats team credits.
 */
export function teamCredit(members: string[] | null | undefined): string | null {
  if (!members || members.length === 0) return null;
  return members.join(', ');
}
