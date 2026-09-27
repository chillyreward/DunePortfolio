import { NavItem, NavItemSchema } from './schema';

export const primaryNav = [
  { label: 'Work', href: '/work', match: 'prefix' },
  { label: 'Hackathons', href: '/#hackathons', match: 'none' },
  { label: 'About', href: '/about', match: 'exact' },
  { label: 'Contact', href: '/#contact', match: 'none' },
] as const;

export const validatedPrimaryNav: NavItem[] = primaryNav.map((item) => NavItemSchema.parse(item));
