'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface HeroHazeProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroHaze({ children, className }: HeroHazeProps) {
  const [filterActive, setFilterActive] = useState(true);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
      setFilterActive(false);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1400; // ms
    const initialScale = 28;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic: 1 - pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentScale = initialScale * (1 - easeOut);

      if (dispRef.current) {
        dispRef.current.setAttribute('scale', currentScale.toFixed(2));
      }

      if (turbRef.current) {
        // Subtle shift in seed/frequency
        const baseFreq = 0.02 + progress * 0.01;
        turbRef.current.setAttribute('baseFrequency', `0.01 ${baseFreq.toFixed(4)}`);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Animation complete: cleanly remove filter so GPU rasterization is 100% crisp
        setFilterActive(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {filterActive && (
        <svg
          aria-hidden="true"
          className="absolute w-0 h-0 pointer-events-none overflow-hidden"
          style={{ position: 'absolute', width: 0, height: 0 }}
        >
          <filter id="hero-haze" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves={2}
              result="turbulence"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="turbulence"
              scale={28}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div
        style={{
          filter: filterActive ? 'url(#hero-haze)' : 'none',
          willChange: filterActive ? 'filter' : 'auto',
        }}
        className={className ?? 'w-full h-full relative'}
      >
        {children}
      </div>
    </>
  );
}
