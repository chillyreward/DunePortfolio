import { flushSync } from 'react-dom';

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

// Eclipse theme switch (brief §2): the new mode is revealed as a circle growing
// from the origin point. Instant where View Transitions are unsupported or the
// visitor prefers reduced motion.
export function switchThemeWithEclipse(apply: () => void, origin?: { x: number; y: number }) {
  const doc = document as ViewTransitionDoc;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement.style;
  root.setProperty('--eclipse-x', `${x}px`);
  root.setProperty('--eclipse-y', `${y}px`);
  root.setProperty('--eclipse-r', `${r}px`);

  doc.startViewTransition(() => {
    flushSync(apply);
  });
}
