import { SkillGroup, SkillGroupSchema } from './schema';

const rawSkillGroups: SkillGroup[] = [
  {
    id: 'shipped',
    title: 'Shipped with',
    description: 'Technologies used in production applications shipped to real clients and users.',
    skills: [
      'TypeScript',
      'JavaScript',
      'Next.js (App Router)',
      'React',
      'Tailwind CSS',
      'Node.js',
      'Supabase',
      'PostgreSQL',
      'Solidity',
      'Vercel',
      'Zustand',
      'TanStack Query',
    ], // TODO(lenny): refine skills per your preference
  },
  {
    id: 'experiments',
    title: 'Used in coursework and experiments',
    description:
      'Tools and languages applied in university coursework at CUEA, hackathon prototypes, and systems experiments.',
    skills: [
      'Python',
      'Java',
      'C',
      'C++',
      'FastAPI',
      'Web3',
      'Git & GitHub',
      'Docker',
      'REST APIs',
    ], // TODO(lenny): refine skills per your preference
  },
  {
    id: 'learning',
    title: 'Currently learning',
    description:
      'Areas of active study focusing on machine learning engineering and mathematical foundations.',
    skills: [
      'PyTorch',
      'Machine Learning Systems',
      'Applied Mathematics for ML',
      'Model Optimization',
    ], // TODO(lenny): refine skills per your preference
  },
];

export const skillGroups: SkillGroup[] = rawSkillGroups.map((g) => SkillGroupSchema.parse(g));
