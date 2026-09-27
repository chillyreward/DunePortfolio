import { HomePage, HomePageSchema } from './schema';

export const rawHomePage: HomePage = {
  hero: {
    wordmark: 'KIDAVI',
    srName: 'Lenny Kidavi, developer and product builder',
    primaryCta: 'View work',
    cvCta: 'Download CV',
    contactCta: 'Get in touch',
    tagline:
      'Computer Science student at Catholic University of Eastern Africa in Nairobi, designing and building web products and exploring machine learning.',
  },
  selectedWork: {
    heading: 'Selected work',
    lead: 'A selection of web products, client platforms, and hackathon prototypes built for production.',
    projectSlugs: ['smart-chama', 'saka', 'gikuyu-translator', 'oppolia'],
    clientHeading: 'Client work',
    allLink: 'All work',
  },
  hackathons: {
    heading: 'Hackathons',
    lead: 'Building under high velocity, rapid iteration, and intense pressure.',
  },
  aboutTeaser: {
    heading: 'About',
    lead: 'Developer background, technical studies, and product engineering in Nairobi.',
    cta: 'More about me',
  },
  contact: {
    heading: 'Work with me',
    whatsapp: 'WhatsApp',
    socials: { linkedin: 'LinkedIn', github: 'GitHub', fiverr: 'Fiverr', x: 'X' },
  },
};

export const homePage: HomePage = HomePageSchema.parse(rawHomePage);
