import React from 'react';
import { skillGroups } from '@/content/skills';
import { cn } from '@/lib/cn';

export interface SkillGroupsProps {
  className?: string;
}

export function SkillGroups({ className }: SkillGroupsProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10', className)}>
      {skillGroups.map((group) => (
        <div
          key={group.id}
          className="flex flex-col border-t border-line/60 pt-6"
        >
          <h3 className="t-h3 text-ink mb-2">{group.title}</h3>
          <p className="text-xs md:text-sm text-ink-2 leading-relaxed mb-6 font-sans">
            {group.description}
          </p>

          <ul className="flex flex-wrap gap-2 mt-auto" role="list">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="inline-flex items-center text-xs font-mono font-medium px-2.5 py-1 rounded-[2px] bg-surface/50 border border-line text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
