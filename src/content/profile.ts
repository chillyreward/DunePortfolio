import { Profile, ProfileSchema } from './schema';
import { img } from './image';

const rawProfile: Profile = {
  name: 'Lenny Kidavi',
  alias: 'Lenny Navwani',
  title: 'Independent Developer & CS Student',
  positioning:
    "I design and build products end to end, and I'm working toward machine learning engineering.",
  bio: [
    'Computer Science student at the Catholic University of Eastern Africa (CUEA) in Nairobi, shipping real products for businesses and users across Kenya.',
    'Hackathon winner (Red, White & Build 2026) and builder focused on clean interfaces, robust full-stack architecture, and machine learning systems.',
  ],
  education: {
    institution: 'Catholic University of Eastern Africa (CUEA)',
    degree: 'BSc Computer Science',
    period: '2025–2028',
    location: "Lang'ata, Nairobi, Kenya",
    expectedGraduation: 2028,
  },
  contact: {
    email: 'lennykidavik@gmail.com',
    phone: '+254 714 301 086',
    whatsapp: 'https://wa.me/254714301086',
    github: 'https://github.com/chillyreward',
    linkedin: 'https://www.linkedin.com/in/lenny-kidavi-4693ba355',
    fiverr: 'https://www.fiverr.com/lennynavwani',
    // TODO(lenny): confirm whether to keep or drop X profile
    x: 'https://x.com/Lenny_kidavi',
  },
  portrait: img('/images/portrait/portrait.webp', 'Lenny Kidavi monochrome portrait'),
  portraitAbout: img('/images/portrait/portrait-about.webp', 'Lenny Kidavi'),
  portraitCutout: img('/images/portrait/portrait-cutout.webp', 'Lenny Kidavi transparent cutout'),
};

export const profile = ProfileSchema.parse(rawProfile);
