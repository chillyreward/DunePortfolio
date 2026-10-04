'use client';

import { useEffect, useState } from 'react';

export interface CaseStudyTocProps {
  label: string;
  entries: { id: string; label: string }[];
}

// Sticky in-page contents for case studies (desktop). Marks the section in view.
export function CaseStudyToc({ label, entries }: CaseStudyTocProps) {
  const [current, setCurrent] = useState(entries[0]?.id);

  useEffect(() => {
    const sections = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    const update = () => {
      const line = window.innerHeight * 0.35;
      let id = sections[0]?.id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) id = s.id;
      }
      setCurrent(id);
    };
    const observer = new IntersectionObserver(update, { rootMargin: '-35% 0px -64% 0px' });
    sections.forEach((s) => observer.observe(s));
    update();
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label={label} className="hidden lg:block sticky top-[104px]">
      <p className="t-meta mb-3">{label}</p>
      <ul className="border-l border-line">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              aria-current={current === e.id ? 'true' : undefined}
              className="block -ml-px border-l pl-4 py-2 t-small text-ink-2 border-transparent hover:text-ink aria-[current=true]:border-ink aria-[current=true]:text-ink"
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
