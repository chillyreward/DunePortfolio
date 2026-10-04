import { Project, ProjectSchema } from './schema';
import { img } from './image';

const rawProjects: Project[] = [
  {
    slug: 'smart-chama',
    title: 'SmartChama',
    tagline: 'Digital savings and loan management for African savings groups.',
    type: 'product',
    role: null, // TODO(lenny): confirm exact role
    credit: "Built by my team and me; now part of NeuroGrowth's product line.", // Confirmed by Lenny 2026-10-04
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
    // Story approved by Lenny 2026-10-04.
    story: [
      "Chamas run on trust, but most still track contributions, loans and Merry-Go-Round turns in notebooks and WhatsApp threads, so it's hard for members to see where the money is. My team and I built SmartChama to make that automatic and visible: M-Pesa contributions are tracked as they come in, internal loans and rotation schedules are managed in one place, and a Solidity smart-contract layer records the group's rules so no single person can quietly change them.",
      "The hardest part was the M-Pesa integration. The API is difficult to work with, but we got it working: members now pay with an M-Pesa STK push, and their contributions show up in the group's records as they happen.",
    ],
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
    // Story: paragraph 1 approved by Lenny 2026-10-04; paragraph 2 drafted from his answer, pending OK.
    story: [
      "Finding a plumber, electrician or mechanic you can trust in Nairobi usually means asking around. Saka is a marketplace for finding verified local tradespeople near you, starting in Nairobi. It's inquiry-first: you message a pro directly, agree on the job, and pay them straight through M-Pesa. Saka takes no commission. I'm the main founder, and we're a team of five.",
      "The hardest part is finding the right people: identifying skilled tradespeople and checking them before we approve them on Saka, because the marketplace is only as good as the pros listed on it.",
    ],
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
    role: 'Full-stack developer', // Confirmed by Lenny 2026-10-04
    year: 2026, // Confirmed by Lenny 2026-10-04
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
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'], // Confirmed by Lenny 2026-09-27
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
    role: 'Full-stack developer', // Confirmed by Lenny 2026-10-04
    year: 2026, // Confirmed by Lenny 2026-10-04
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
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'], // Confirmed by Lenny 2026-10-04
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
    role: 'Full-stack developer', // Confirmed by Lenny 2026-10-04
    credit: "Built by my team and me; now part of NeuroGrowth's product line.", // Confirmed by Lenny 2026-10-04
    year: 2026, // Confirmed by Lenny 2026-10-04
    liveUrl: 'https://gikuyu-translate.vercel.app',
    repoUrl: 'https://github.com/chillyreward/New-translator',
    summary:
      // From the live site (gikuyu-translate.vercel.app), checked 2026-10-04.
      'AI translation from English and Kiswahili into Gikuyu, designed for learners, families and communities preserving the language.',
    highlights: [
      'Bilingual source translation into Gikuyu',
      'Phrasebook and translation history',
      'Spoken Gikuyu output (text-to-speech)', // Live: confirmed by Lenny 2026-10-04
    ],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'ElevenLabs API'], // Engine and live TTS confirmed by Lenny 2026-10-04
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
    tagline: 'AI engineering studio in Nairobi.', // Lenny, PROMPT 13 reference facts
    type: 'client', // Confirmed by Lenny 2026-10-04
    role: 'Marketing Engineering', // Confirmed by Lenny 2026-10-04
    contributions: ['Led the full website upgrade'], // Confirmed by Lenny 2026-10-04
    year: 2026, // Confirmed by Lenny 2026-10-04
    liveUrl: 'https://www.neurogrowthtech.com/', // Confirmed by Lenny 2026-09-27
    repoUrl: 'https://github.com/Neuro-growth/neurogrowthwebsite', // Lenny, PROMPT 13 reference facts
    summary:
      'AI engineering studio in Nairobi building automation, chatbots and prediction systems for African businesses.', // Lenny, PROMPT 13 reference facts
    highlights: [],
    story: null, // TODO(lenny): add case study story paragraphs
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], // Confirmed by Lenny 2026-10-04
    team: null,
    cover: img('/images/portrait/portrait.webp', 'NeuroGrowth placeholder'),
    gallery: [],
    featured: true, // Confirmed by Lenny 2026-10-04
    publish: false, // Approved 2026-10-04; Phase B flips to true once a real screenshot replaces the placeholder cover
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
