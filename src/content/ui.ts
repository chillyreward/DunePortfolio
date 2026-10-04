import type { ProjectType } from './schema';
import type { RealmName } from '@/design/tokens';

// Shared interface labels. Page-specific copy lives in its own content file.
export const ui = {
  realms: {
    arrakis: 'Arrakis',
    fremen: 'Fremen',
    atreides: 'House Atreides',
    corrino: 'House Corrino',
  } satisfies Record<RealmName, string>,
  projectTypes: {
    product: 'Product',
    client: 'Client work',
    experiment: 'Experiment',
  } satisfies Record<ProjectType, string>,
  project: {
    role: 'Role',
    team: 'Team',
    stack: 'Stack',
    year: 'Year',
    caseStudy: 'Read case study',
    visit: 'Visit site',
    source: 'Source code',
    allWork: 'All work',
    next: 'Next project',
    overview: 'Overview',
    features: 'Key features',
    contributions: 'Role and contributions',
    story: 'Story',
    gallery: 'Screens',
  },
  hackathon: {
    prize: 'Prize',
    project: 'Project',
    team: 'Team',
    organiser: 'Organised by',
  },
  footer: {
    contact: 'Get in touch',
    whatsapp: 'WhatsApp',
    elsewhere: 'Elsewhere',
    site: 'Site',
    backToTop: 'Back to top',
  },
};
