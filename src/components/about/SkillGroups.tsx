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
          className="flex flex-col border-t border-line pt-6"
        >
          <h3 className="t-h3 text-ink mb-2">{group.title}</h3>
          <p className="t-small text-ink-2 mb-4">{group.description}</p>
          <p className="t-body text-ink">{group.skills.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
