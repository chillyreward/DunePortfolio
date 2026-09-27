import { HomePage, HomePageSchema } from './schema';

export const rawHomePage: HomePage = {
  hero: {
    wordmark: 'LENNY KIDAVI',
    role: 'Full-Stack Developer & CS Student',
    tagline:
      'Computer Science student at Catholic University of Eastern Africa in Nairobi, designing and building web products and exploring machine learning.',
  },
  selectedWork: {
    heading: 'Selected Work',
    lead: 'A selection of web products, client platforms, and hackathon prototypes built for production.',
    projectSlugs: ['smart-chama', 'saka', 'oppolia'],
  },
  hackathons: {
    heading: 'Hackathons',
    lead: 'Building under high velocity, rapid iteration, and intense pressure.',
  },
  aboutTeaser: {
    heading: 'About',
    lead: 'Developer background, technical studies, and product engineering in Nairobi.',
    cta: 'Read full background',
  },
  contact: {
    heading: 'Contact',
    lead: 'Available for internships, freelance client projects, and full-time software engineering roles.',
  },
};

export const homePage: HomePage = HomePageSchema.parse(rawHomePage);
