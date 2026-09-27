'use client';

import React, { useState } from 'react';
import { Project, ProjectType } from '@/content/schema';
import { ProjectRow } from './ProjectRow';
import { workContent } from '@/content/work';
import { cn } from '@/lib/cn';

export interface WorkFilterProps {
  projects: Project[];
}

export function WorkFilter({ projects }: WorkFilterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectType>('all');

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  const getCount = (type: 'all' | ProjectType) => {
    if (type === 'all') return projects.length;
    return projects.filter((p) => p.type === type).length;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-3 py-6 border-b border-line">
        <span className="t-meta text-ink-2 font-mono text-xs uppercase tracking-wider mr-2">
          Filter:
        </span>
        {workContent.filters.map((f) => {
          const isSelected = activeFilter === f.value;
          const count = getCount(f.value as 'all' | ProjectType);

          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value as 'all' | ProjectType)}
              aria-pressed={isSelected}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-sm font-medium transition-colors border',
                isSelected
                  ? 'bg-accent text-accent-ink border-accent'
                  : 'bg-surface/30 text-ink border-line hover:border-ink/40'
              )}
            >
              <span>{f.label}</span>
              <span
                className={cn(
                  'text-xs font-mono px-1.5 py-0.2 rounded',
                  isSelected ? 'bg-white/20 text-white' : 'bg-ink/5 text-ink-2'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Screen-reader Live Announcer */}
      <div role="status" aria-live="polite" className="sr-only">
        Showing {filteredProjects.length} {activeFilter === 'all' ? 'projects' : `${activeFilter} projects`}
      </div>

      {/* Project Rows */}
      <div className="flex flex-col">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={idx}
              featured={project.featured}
            />
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="t-lead text-ink-2">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
