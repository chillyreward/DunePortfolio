import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Realm } from '@/components/realm/Realm';
import { RealmMarker } from '@/components/realm/RealmMarker';
import { WorkFilter } from '@/components/work/WorkFilter';
import { getPublishedProjects } from '@/content/projects';
import { workContent } from '@/content/work';

export const metadata: Metadata = {
  title: 'Work & Projects',
  description:
    'Web applications, client platforms, and software experiments designed and engineered by Lenny Kidavi in Nairobi, Kenya.',
};

export default function WorkPage() {
  const publishedProjects = getPublishedProjects();

  return (
    <Realm name="atreides" className="min-h-screen py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="pb-8 border-b border-line">
          <RealmMarker realm="atreides" className="mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink tracking-tight mb-4">
            {workContent.heading}
          </h1>
          <p className="t-lead text-ink-2 max-w-2xl">
            {workContent.lead}
          </p>
        </div>

        {/* Filter & Project Rows */}
        <WorkFilter projects={publishedProjects} />
      </Container>
    </Realm>
  );
}
