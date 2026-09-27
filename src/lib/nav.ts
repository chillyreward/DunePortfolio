export type NavMatchMode = 'prefix' | 'exact' | 'none';

export function isNavActive(pathname: string, href: string, match: NavMatchMode): boolean {
  if (match === 'none') {
    return false;
  }
  if (match === 'exact') {
    return pathname === href;
  }
  if (match === 'prefix') {
    return pathname === href || pathname.startsWith(href + '/');
  }
  return false;
}
