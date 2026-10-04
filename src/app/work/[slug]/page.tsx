import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjects, getProjectBySlug, isVisible } from '@/content/projects';
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({
    slug: p.slug,
  }));
}

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project || !isVisible(project)) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Lenny Kidavi`,
      description: project.tagline,
      ...(project.cover
        ? {
            images: [
              {
                url: project.cover.src,
                width: project.cover.width,
                height: project.cover.height,
                alt: project.cover.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project || !isVisible(project)) {
    notFound();
  }

  // Find next visible project in sequence
  const permittedProjects = getProjects();
  const currentIndex = permittedProjects.findIndex((p) => p.slug === params.slug);
  const nextProject =
    currentIndex >= 0 && currentIndex + 1 < permittedProjects.length
      ? permittedProjects[currentIndex + 1]
      : null;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    author: {
      '@type': 'Person',
      name: 'Lenny Kidavi',
      url: 'https://lennydev.vercel.app',
    },
    ...(project.cover ? { image: project.cover.src } : {}),
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyLayout project={project} nextProject={nextProject} />
    </>
  );
}
