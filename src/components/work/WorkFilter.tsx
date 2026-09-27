'use client';

import React, { useState } from 'react';
import { Project, ProjectType } from '@/content/schema';
import { ProjectRow } from './ProjectRow';
import { workContent } from '@/content/work';
import { cn } from '@/lib/cn';

export interface WorkFilterProps {
  projects: Project[];
}

type Filter = 'all' | ProjectType;

export function WorkFilter({ projects }: WorkFilterProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter);

  // Only offer filters that have at least one visible project.
  const filters = workContent.filters.filter(
    (f) => f.value === 'all' || projects.some((p) => p.type === f.value)
  );

  return (
    <div className="flex flex-col w-full">
      {filters.length > 2 && (
        <div role="group" aria-label={workContent.filterLabel} className="flex flex-wrap gap-x-6 border-b border-line">
          {filters.map((f) => {
            const isSelected = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value as Filter)}
                aria-pressed={isSelected}
                className={cn(
                  't-small min-h-11 -mb-px border-b-2 transition-colors',
                  isSelected ? 'border-accent text-ink font-medium' : 'border-transparent text-ink-2 hover:text-ink'
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      <div role="status" aria-live="polite" className="sr-only">
        {filteredProjects.length} {workContent.resultsLabel}
      </div>

      <div className="flex flex-col">
        {filteredProjects.map((project, idx) => (
          <ProjectRow key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
