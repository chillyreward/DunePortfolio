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
      'First place with SmartChama at the U.S. Embassy Kenya AI & Tech hackathon.',
    certificate: img(
      '/images/hackathons/red-white-build/certificate.webp',
      'Certificate of Achievement — Red, White & Build Hackathon Winner'
    ),
    photos: [
      img('/images/hackathons/red-white-build/photo-01.webp', 'The winning team holding the $1,000 prize cheque'),
      img('/images/hackathons/red-white-build/photo-02.webp', 'Certificate handover on stage'),
      img('/images/hackathons/red-white-build/photo-03.webp', 'Presenting the Credit Passport slide'),
      img('/images/hackathons/red-white-build/photo-04.webp', 'Team members in the audience'),
      img('/images/hackathons/red-white-build/photo-05.webp', 'Participants at the ceremony'),
      img('/images/hackathons/red-white-build/photo-06.webp', 'Participants after the event'),
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
    date: '2026', // Confirmed by Lenny 2026-10-04. TODO(lenny): exact date
    location: 'Online',
    team: ['Lenny Kidavi', 'Rachael', 'Shilla'], // Confirmed by Lenny 2026-10-04
    summary: 'Second place finish with SmartChama at the online Beorchild hackathon.',
    certificate: null,
    photos: [],
  },
];

export const hackathons: Hackathon[] = rawHackathons.map((h) => HackathonSchema.parse(h));
