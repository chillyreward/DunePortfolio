import { Project, ProjectSchema } from './schema';
import { img } from './image';

const rawProjects: Project[] = [
  {
    slug: 'smart-chama',
    title: 'SmartChama',
    tagline: 'Digital savings and loan management for African savings groups.',
    type: 'product',
    role: null, // TODO(lenny): confirm exact role and NeuroGrowth relationship
    year: 2026, // TODO(lenny): confirm project inception year if earlier
    liveUrl: 'https://www.smartchama.tech', // TODO(lenny): confirm canonical domain vs vercel domain
    repoUrl: 'https://github.com/chillyreward/SmartChama',
    summary:
      'Digital platform for Kenyan chama savings groups, automating M-Pesa contribution tracking, internal loans, Merry-Go-Round rotation schedules, and smart-contract verification.',
    highlights: [
      'Automated M-Pesa contribution tracking and internal loan management',
      'Merry-Go-Round rotation schedule coordination',
      'Solidity/Ethereum smart-contract security layer',
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Solidity', 'Ethereum'], // TODO(lenny): confirm full tech stack
    team: ['Lenny Kidavi', 'Rachael', 'Shilla', 'Nanjoli'],
    cover: img('/images/projects/smart-chama/cover.webp', 'SmartChama landing page and dashboard preview'),
    gallery: [
      img('/images/projects/smart-chama/capture-desktop.webp', 'SmartChama desktop overview'),
      img('/images/projects/smart-chama/capture-mobile.webp', 'SmartChama mobile interface'),
      img('/images/projects/smart-chama/capture-desktop-full.webp', 'SmartChama full landing page'),
    ],
    featured: true,
    publish: true,
    permission: true,
  },
  {
    slug: 'saka',
    title: 'Saka',
    tagline: 'Local trades and service discovery marketplace in Nairobi.',
    type: 'product',
    role: 'Lead Founder & Full-Stack Developer',
    year: 2025, // TODO(lenny): confirm start year
    liveUrl: 'https://sakahapa.vercel.app',
    repoUrl: null, // Private repository
    summary:
      'Inquiry-first marketplace connecting Nairobi households with verified local plumbers, electricians, and mechanics, with zero commission and direct M-Pesa payments.',
    highlights: [
      'Directory of verified local trades in Nairobi',
      'Inquiry-first flow with direct communication via WhatsApp and phone',
      'Zero-commission structure with direct peer-to-peer M-Pesa payouts',
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: [
      'Next.js 14',
      'Supabase',
      'Cloudinary',
      'Google Maps',
      'Zustand',
      'TanStack Query',
      'next-pwa',
      'Upstash Redis',
      'Vercel',
    ],
    team: ['Lenny Kidavi', 'Team of five'], // TODO(lenny): add teammate names if desired
    cover: img('/images/projects/saka/cover.webp', 'Saka service discovery marketplace'),
    gallery: [
      img('/images/projects/saka/capture-desktop.webp', 'Saka desktop search interface'),
      img('/images/projects/saka/capture-mobile.webp', 'Saka mobile discovery view'),
      img('/images/projects/saka/capture-desktop-full.webp', 'Saka full marketplace directory'),
    ],
    featured: true,
    publish: true,
    permission: true,
  },
  {
    slug: 'oppolia',
    title: 'Oppolia Woodworths Kenya',
    tagline: 'Luxury fitted cabinetry and interior architecture website.',
    type: 'client',
    role: null, // TODO(lenny): confirm role and contributions
    year: null, // TODO(lenny): confirm launch year
    liveUrl: 'https://www.oppoliakenya.co.ke',
    repoUrl: null, // Client proprietary
    summary:
      'High-end brand and showcase website for Oppolia Woodworths Kenya, displaying custom luxury cabinetry, wardrobes, and architectural interior fittings.',
    highlights: [
      'Luxury architectural showcase with high-resolution interior galleries',
      'Consultation scheduling and quote request inquiry pipeline',
      'Mobile-responsive Italian-inspired design aesthetic',
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'], // TODO(lenny): confirm full client stack
    team: null,
    cover: img('/images/projects/oppolia/cover.webp', 'Oppolia Woodworths Kenya hero presentation'),
    gallery: [
      img('/images/projects/oppolia/capture-desktop.webp', 'Oppolia desktop portfolio showcase'),
      img('/images/projects/oppolia/capture-mobile.webp', 'Oppolia mobile responsive view'),
      img('/images/projects/oppolia/capture-desktop-full.webp', 'Oppolia full website landing page'),
    ],
    featured: true,
    publish: true,
    permission: true, // Confirmed by Lenny 2026-09-27
  },
  {
    slug: 'sucre-bushworks',
    title: 'Sucre Bushworks',
    tagline: 'Kenyan camping gear, campsite directory, and wilderness expeditions.',
    type: 'client',
    role: null, // TODO(lenny): confirm role and contributions
    year: null, // TODO(lenny): confirm launch year
    liveUrl: 'https://sucre-bushworks.vercel.app',
    repoUrl: null, // Client repository
    summary:
      'Camping gear, Kenyan campsites and guided trips, with a WhatsApp inquiry basket.',
    highlights: [
      'Campsite exploration and camping gear catalogue',
      'Direct WhatsApp inquiry basket for trip planning and gear rental',
      'Responsive wilderness-focused visual identity',
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'], // TODO(lenny): confirm full client stack
    team: null,
    cover: img('/images/projects/sucre-bushworks/cover.webp', 'Sucre Bushworks outdoor adventure portal'),
    gallery: [
      img('/images/projects/sucre-bushworks/capture-desktop.webp', 'Sucre Bushworks desktop interface'),
      img('/images/projects/sucre-bushworks/capture-mobile.webp', 'Sucre Bushworks mobile booking view'),
      img('/images/projects/sucre-bushworks/capture-desktop-full.webp', 'Sucre Bushworks full landing page'),
    ],
    featured: false,
    publish: true,
    permission: true, // Confirmed by Lenny 2026-09-27
  },
  {
    slug: 'gikuyu-translator',
    title: 'Gikuyu Translator',
    tagline: 'AI translation from English and Kiswahili into Gikuyu.',
    type: 'experiment',
    role: null, // TODO(lenny): confirm role and NeuroGrowth credit
    year: null, // TODO(lenny): confirm launch year
    liveUrl: 'https://gikuyu-translate.vercel.app',
    repoUrl: 'https://github.com/chillyreward/New-translator',
    summary:
      'Language technology experiment translating English and Kiswahili phrases into Gikuyu, built to support indigenous language preservation and learning.',
    highlights: [
      'Bilingual source translation into Gikuyu',
      'Interactive dictionary and phrase translation interface',
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], // TODO(lenny): confirm underlying model/API and TTS status
    team: null,
    cover: img('/images/projects/gikuyu-translator/cover.webp', 'Gikuyu Translator AI translation interface'),
    gallery: [
      img('/images/projects/gikuyu-translator/capture-desktop.webp', 'Gikuyu Translator desktop screen'),
      img('/images/projects/gikuyu-translator/capture-mobile.webp', 'Gikuyu Translator mobile view'),
      img('/images/projects/gikuyu-translator/capture-desktop-full.webp', 'Gikuyu Translator full landing page'),
    ],
    featured: false,
    publish: true,
    permission: true,
  },
  {
    slug: 'neuro-growth',
    title: 'NeuroGrowth',
    tagline: 'AI and software engineering initiative.',
    type: 'client', // Confirmed by Lenny 2026-10-04
    role: null, // TODO(lenny): role and contributions
    year: null, // TODO(lenny): project year
    liveUrl: 'https://www.neurogrowthtech.com/', // Confirmed by Lenny 2026-09-27
    repoUrl: null, // TODO(lenny): repository link
    summary: 'AI and software engineering initiative.', // Confirmed by Lenny 2026-10-04
    highlights: [],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: [], // TODO(lenny): tech stack
    team: null,
    cover: img('/images/portrait/portrait.webp', 'NeuroGrowth placeholder'),
    gallery: [],
    featured: false,
    publish: false, // TODO(lenny): approved to show 2026-10-04; publish once a real screenshot replaces the placeholder cover
    permission: true, // Confirmed by Lenny 2026-10-04
  },
  {
    slug: 'allenet-bakers',
    title: 'Allenet Bakers',
    tagline: 'Commercial bakery web presence and ordering.',
    type: 'client',
    role: null, // TODO(lenny): role
    year: null, // TODO(lenny): year
    liveUrl: null, // TODO(lenny): live URL once launched (allenetbakers.com?)
    repoUrl: null,
    summary: 'Web platform for Allenet Bakers commercial bakery.',
    highlights: [],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: [], // TODO(lenny): tech stack
    team: null,
    cover: img('/images/portrait/portrait.webp', 'Allenet Bakers placeholder'),
    gallery: [],
    featured: false,
    publish: false, // TODO(lenny): publish after official launch only
    permission: false,
  },
];

export const projects: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));

export function isVisible(
  project: Project,
  options?: { visibility?: 'production' | 'all' }
): boolean {
  const isProd = options?.visibility === 'production' || process.env.NODE_ENV === 'production';
  if (isProd) {
    return project.publish && (project.type !== 'client' || project.permission);
  }
  return project.publish;
}

export function getProjects(options?: { visibility?: 'production' | 'all' }): Project[] {
  return projects.filter((p) => isVisible(p, options));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublishedProjects(): Project[] {
  return getProjects();
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

// Client work lives in House Corrino; own products and experiments in House Atreides.
export function realmFor(project: Project): 'atreides' | 'corrino' {
  return project.type === 'client' ? 'corrino' : 'atreides';
}
