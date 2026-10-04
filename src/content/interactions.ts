// Interface copy for the Phase C interactions (search palette, copy email, realm compass).

export const search = {
  button: 'Search',
  shortcutHint: 'Ctrl K',
  dialogLabel: 'Search the site',
  placeholder: 'Search pages, projects and actions',
  empty: 'Nothing matches that.',
  groups: {
    pages: 'Pages',
    projects: 'Projects',
    hackathons: 'Hackathons',
    actions: 'Actions',
  },
  pages: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Hackathons', href: '/#hackathons' },
    { label: 'Contact', href: '/#contact' },
    { label: 'CV', href: '/cv' },
  ],
  actions: {
    downloadCv: 'Download CV',
    copyEmail: 'Copy email address',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    whatsapp: 'Open WhatsApp',
  },
};

export const copyEmail = {
  button: 'Copy email',
  done: 'Email address copied',
  failed: 'Could not copy. Please select the address instead.',
};

export const gallery = {
  of: 'of',
};

export const caseStudyToc = {
  label: 'On this page',
};
