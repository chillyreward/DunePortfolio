export const cv = {
  title: 'CV',
  pageLabel: 'Curriculum vitae',
  pageNote: 'A4, print ready',
  summary:
    'Computer Science student and developer in Nairobi. I design and build web products end to end, and I am working toward machine learning engineering.',
  headings: {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    hackathons: 'Hackathons',
    skills: 'Skills',
    links: 'Links',
  },
  // Confirmed by Lenny 2026-10-04 (start year 2025). Bullets restate the facts register only.
  experience: [
    {
      role: 'Independent software developer',
      org: 'Self-employed',
      location: 'Nairobi, Kenya',
      period: '2025 – present',
      points: [
        'Built SmartChama with a team of four: digital savings and loan management for chamas, with a Solidity/Ethereum smart-contract layer. Winner of Red, White & Build 2026.',
        'Main founder of Saka, a team of five building a marketplace for finding verified local tradespeople in Nairobi.',
        'Built client websites for Oppolia Woodworths Kenya and Sucre Bushworks.',
      ],
    },
  ],
  labels: {
    expected: 'expected',
    role: 'Role',
    stack: 'Stack',
    built: 'Project',
    team: 'Team',
    organiser: 'Organised by',
    prize: 'Prize',
    portfolio: 'Portfolio',
    fiverr: 'Fiverr',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  portfolioUrl: 'https://lennydev.vercel.app',
  whatsapp: 'WhatsApp',
  download: 'Download CV',
  downloadFileName: 'Lenny-Kidavi-CV.pdf',
  print: 'Print',
};

export type CvContent = typeof cv;
