import { Profile, ProfileSchema } from './schema';
import { img } from './image';

const rawProfile: Profile = {
  name: 'Lenny Kidavi',
  alias: 'Lenny Navwani',
  title: 'Independent Developer & CS Student',
  positioning:
    "I design and build products end to end, and I'm working toward machine learning engineering.",
  bio: [
    "I study Computer Science at CUEA in Nairobi. I design and build products end to end, and I'm working toward machine learning engineering.",
    'In February 2026 my team won the Red, White & Build US–Kenya Hackathon with SmartChama.',
    "I'm the main founder of Saka, a marketplace for finding local tradespeople in Nairobi, and I build websites for clients.",
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
    // Keep X: confirmed by Lenny 2026-09-27 and 2026-10-04
    x: 'https://x.com/Lenny_kidavi',
  },
  availability: 'Available for freelance projects and internships',
  cvPath: '/documents/lenny-kidavi-cv.pdf',
  portrait: img('/images/portrait/portrait.webp', 'Lenny Kidavi monochrome portrait'),
  portraitAbout: img('/images/portrait/portrait-about.webp', 'Lenny Kidavi'),
  portraitCutout: img('/images/portrait/portrait-cutout.webp', 'Lenny Kidavi transparent cutout'),
};

export const profile = ProfileSchema.parse(rawProfile);
