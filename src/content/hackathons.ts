import { Hackathon, HackathonSchema } from './schema';
import { img } from './image';

const rawHackathons: Hackathon[] = [
  {
    id: 'red-white-build',
    name: 'Red, White & Build US–Kenya Hackathon (AI & Tech)',
    organizer: 'U.S. Embassy Kenya',
    project: 'SmartChama',
    projectSlug: 'smart-chama',
    placement: 'Winner',
    prize: '$1,000',
    date: '19 February 2026',
    location: 'Nairobi, Kenya',
    team: ['Lenny Kidavi', 'Rachael', 'Shilla', 'Nanjoli'], // TODO(lenny): teammates' surnames optional
    summary:
      'First place at the U.S. Embassy Kenya AI & Tech hackathon with SmartChama, demonstrating digital savings group management, automated M-Pesa tracking, and smart contracts.',
    certificate: img(
      '/images/hackathons/red-white-build/certificate.webp',
      'Certificate of Achievement — Red, White & Build Hackathon Winner'
    ),
    photos: [
      img('/images/hackathons/red-white-build/photo-01.webp', 'Lenny pitching SmartChama at hackathon finals'),
      img('/images/hackathons/red-white-build/photo-02.webp', 'Stage presentation of SmartChama features'),
      img('/images/hackathons/red-white-build/photo-03.webp', 'Team collaborating during the build sprint'),
      img('/images/hackathons/red-white-build/photo-04.webp', 'SmartChama credit passport presentation'),
      img('/images/hackathons/red-white-build/photo-05.webp', 'Award ceremony with U.S. Embassy officials'),
      img('/images/hackathons/red-white-build/photo-06.webp', 'Winners celebration on stage'),
    ],
  },
  {
    id: 'beorchild',
    name: 'Beorchild Hackathon',
    organizer: 'Beorchild', // TODO(lenny): confirm official organizer spelling & name
    project: 'SmartChama',
    projectSlug: 'smart-chama',
    placement: 'Second place',
    prize: null, // TODO(lenny): confirm prize if any
    date: '2025', // TODO(lenny): confirm exact date
    location: 'Online',
    team: ['Lenny Kidavi'], // TODO(lenny): confirm full team
    summary: 'Second place finish with SmartChama at the online Beorchild hackathon.',
    certificate: null,
    photos: [],
  },
];

export const hackathons: Hackathon[] = rawHackathons.map((h) => HackathonSchema.parse(h));
