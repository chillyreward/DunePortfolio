import { search } from '@/content/interactions';
import { getProjects } from '@/content/projects';
import { hackathons } from '@/content/hackathons';
import { ui } from '@/content/ui';

export type SearchGroup = keyof typeof search.groups;
export type SearchAction = 'download-cv' | 'copy-email' | 'toggle-theme' | 'whatsapp';

export interface SearchItem {
  id: string;
  label: string;
  group: SearchGroup;
  hint?: string;
  href?: string;
  action?: SearchAction;
}

// Built on the server and handed to the client palette as plain props.
export function buildSearchItems(): SearchItem[] {
  const pages: SearchItem[] = search.pages.map((p) => ({
    id: `page-${p.href}`,
    label: p.label,
    group: 'pages',
    href: p.href,
  }));

  const projects: SearchItem[] = getProjects().map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    group: 'projects',
    hint: ui.projectTypes[p.type],
    href: `/work/${p.slug}`,
  }));

  const events: SearchItem[] = hackathons.map((h) => ({
    id: `hackathon-${h.id}`,
    label: h.name,
    group: 'hackathons',
    hint: h.placement,
    href: '/about#hackathons',
  }));

  const actions: SearchItem[] = [
    { id: 'action-cv', label: search.actions.downloadCv, group: 'actions', action: 'download-cv' },
    { id: 'action-email', label: search.actions.copyEmail, group: 'actions', action: 'copy-email' },
    { id: 'action-theme', label: search.actions.toDark, group: 'actions', action: 'toggle-theme' },
    { id: 'action-whatsapp', label: search.actions.whatsapp, group: 'actions', action: 'whatsapp' },
  ];

  return [...pages, ...projects, ...events, ...actions];
}
