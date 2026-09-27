import { Profile, ProfileSchema } from './schema';
import { img } from './image';

const rawProfile: Profile = {
  name: 'Lenny Kidavi',
  alias: 'Lenny Navwani',
  title: 'Independent Developer & CS Student',
  positioning:
    "I design and build products end to end, and I'm working toward machine learning engineering.",
  bio: [
    'Computer Science student at the Catholic University of Eastern Africa (CUEA) in Nairobi, focused on full-stack web products and advancing toward machine learning engineering.',
    'Self-taught web foundations evolving into rigorous software engineering, systems design, and typed architectures.',
    'Hackathon winner at the U.S. Embassy Kenya Red, White & Build 2026 hackathon with SmartChama, engineering digital savings group management and smart contract verification.',
    'Practical builder shipping production platforms like Saka local trades marketplace and client web products across Nairobi.',
  ],
  bioStatus: 'draft',
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
  availability: 'Available for freelance projects and internships',
  cvPath: '/documents/lenny-kidavi-cv.pdf',
  portrait: img('/images/portrait/portrait.webp', 'Lenny Kidavi monochrome portrait'),
  portraitAbout: img('/images/portrait/portrait-about.webp', 'Lenny Kidavi'),
  portraitCutout: img('/images/portrait/portrait-cutout.webp', 'Lenny Kidavi transparent cutout'),
};

export const profile = ProfileSchema.parse(rawProfile);
