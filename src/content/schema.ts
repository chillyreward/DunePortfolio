import { z } from 'zod';

export const ImageRefSchema = z.object({
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  alt: z.string(),
});
export type ImageRef = z.infer<typeof ImageRefSchema>;

export const ProjectSlugSchema = z.enum([
  'smart-chama',
  'saka',
  'oppolia',
  'sucre-bushworks',
  'gikuyu-translator',
  'neuro-growth',
  'allenet-bakers',
]);
export type ProjectSlug = z.infer<typeof ProjectSlugSchema>;

export const ProjectTypeSchema = z.enum(['client', 'product', 'experiment']);
export type ProjectType = z.infer<typeof ProjectTypeSchema>;

export const ProjectSchema = z.object({
  slug: ProjectSlugSchema,
  title: z.string().min(1),
  tagline: z.string().min(1),
  type: ProjectTypeSchema,
  role: z.string().nullable(),
  year: z.number().nullable(),
  liveUrl: z.string().url().nullable(),
  repoUrl: z.string().nullable(),
  summary: z.string(),
  highlights: z.array(z.string()),
  story: z.array(z.string().min(1)).nullable(),
  stack: z.array(z.string()),
  team: z.array(z.string()).nullable(),
  cover: ImageRefSchema,
  gallery: z.array(ImageRefSchema),
  featured: z.boolean(),
  publish: z.boolean(),
  permission: z.boolean(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const HackathonIdSchema = z.enum(['red-white-build', 'beorchild']);
export type HackathonId = z.infer<typeof HackathonIdSchema>;

export const HackathonSchema = z.object({
  id: HackathonIdSchema,
  name: z.string(),
  organizer: z.string(),
  project: z.string(),
  projectSlug: ProjectSlugSchema.nullable(),
  placement: z.string(),
  prize: z.string().nullable(),
  date: z.string(),
  location: z.string(),
  team: z.array(z.string()),
  summary: z.string(),
  certificate: ImageRefSchema.nullable(),
  photos: z.array(ImageRefSchema),
});
export type Hackathon = z.infer<typeof HackathonSchema>;

export const SkillGroupSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

export const EpigraphSlotSchema = z.enum(['home-about', 'about', 'not-found']);
export type EpigraphSlot = z.infer<typeof EpigraphSlotSchema>;

export const EpigraphSchema = z.object({
  slot: EpigraphSlotSchema,
  quote: z.string(),
  attribution: z.string(),
});
export type Epigraph = z.infer<typeof EpigraphSchema>;

export const ProfileSchema = z.object({
  name: z.string(),
  alias: z.string().nullable(),
  title: z.string(),
  positioning: z.string(),
  bio: z.array(z.string()),
  bioStatus: z.enum(['draft', 'approved']),
  education: z.object({
    institution: z.string(),
    degree: z.string(),
    period: z.string(),
    location: z.string(),
    expectedGraduation: z.number(),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    whatsapp: z.string().url(),
    github: z.string().url(),
    linkedin: z.string().url(),
    fiverr: z.string().url(),
    x: z.string().url().nullable(),
  }),
  availability: z.string(),
  cvPath: z.string().nullable(),
  portrait: ImageRefSchema,
  portraitAbout: ImageRefSchema,
  portraitCutout: ImageRefSchema,
});
export type Profile = z.infer<typeof ProfileSchema>;

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  match: z.enum(['prefix', 'exact', 'none']),
});
export type NavItem = z.infer<typeof NavItemSchema>;

export const HomePageSchema = z.object({
  hero: z.object({
    wordmark: z.string(),
    srName: z.string(),
    primaryCta: z.string(),
    cvCta: z.string(),
    contactCta: z.string(),
    tagline: z.string(),
  }),
  selectedWork: z.object({
    heading: z.string(),
    lead: z.string(),
    projectSlugs: z.array(ProjectSlugSchema),
    clientHeading: z.string(),
    allLink: z.string(),
  }),
  hackathons: z.object({
    heading: z.string(),
  }),
  aboutTeaser: z.object({
    heading: z.string(),
    lead: z.string(),
    cta: z.string(),
  }),
  contact: z.object({
    heading: z.string(),
    whatsapp: z.string(),
    socials: z.object({
      linkedin: z.string(),
      github: z.string(),
      fiverr: z.string(),
      x: z.string(),
    }),
  }),
});
export type HomePage = z.infer<typeof HomePageSchema>;

