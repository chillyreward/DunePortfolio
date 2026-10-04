import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { ProjectRow } from '@/components/work/ProjectRow';
import { getProjects, realmFor } from '@/content/projects';
import { workContent } from '@/content/work';

export const metadata: Metadata = {
  title: workContent.heading,
  description: workContent.lead,
};

export default function WorkPage() {
  const projects = getProjects();
  const bands = [
    { realm: 'atreides' as const, heading: workContent.ownHeading, items: projects.filter((p) => realmFor(p) === 'atreides') },
    { realm: 'corrino' as const, heading: workContent.clientHeading, items: projects.filter((p) => realmFor(p) === 'corrino') },
  ].filter((band) => band.items.length > 0);

  return (
    <>
      <Realm name="arrakis" className="pt-16 pb-20 md:pt-24 md:pb-28">
        <Container>
          <h1 className="t-h1 text-ink mb-6">{workContent.heading}</h1>
          <p className="t-body text-ink-2">{workContent.lead}</p>
        </Container>
      </Realm>

      {bands.map((band) => (
        <Realm key={band.realm} name={band.realm} className="py-24 md:py-36">
          <Container>
            <div className="pb-4">
              <RealmMarker realm={band.realm} className="mb-4" />
              <h2 className="t-h2 text-ink">{band.heading}</h2>
            </div>
            {band.items.map((project, idx) => (
              <ProjectRow key={project.slug} project={project} index={idx} />
            ))}
          </Container>
        </Realm>
      ))}
    </>
  );
}
