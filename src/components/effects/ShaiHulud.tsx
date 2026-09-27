'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { easterEgg } from '@/content/easter-egg';

export function ShaiHulud() {
  const [isActive, setIsActive] = useState(false);
  const [isTremor, setIsTremor] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const keySequenceRef = useRef<string>('');

  const triggerWorm = useCallback(() => {
    setIsActive(true);
    setIsTremor(true);
    setShowToast(true);

    // Stop tremor after 1.2s
    const tremorTimer = setTimeout(() => {
      setIsTremor(false);
    }, 1200);

    // End worm breach animation after 4.5s
    const wormTimer = setTimeout(() => {
      setIsActive(false);
    }, 4500);

    return () => {
      clearTimeout(tremorTimer);
      clearTimeout(wormTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing into input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      keySequenceRef.current = (keySequenceRef.current + e.key.toLowerCase()).slice(-8);
      if (keySequenceRef.current.includes(easterEgg.triggerKeys)) {
        keySequenceRef.current = '';
        triggerWorm();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const marker = target?.closest('[data-realm-marker]');
      if (marker && e.detail >= 3) {
        triggerWorm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [triggerWorm]);

  return (
    <>
      {/* Screen reader live region */}
      <div aria-live="polite" className="sr-only">
        {isActive ? easterEgg.announcement : ''}
      </div>

      {/* Screen rumble tremor overlay */}
      {isTremor && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998] animate-tremor"
          aria-hidden="true"
        />
      )}

      {/* Segmented Shai-Hulud Worm SVG */}
      {isActive && (
        <div
          className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex items-end justify-center"
          aria-hidden="true"
        >
          <div className="w-[1200px] max-w-full h-[600px] mb-[-100px] animate-worm">
            <svg
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
            >
              <defs>
                <linearGradient id="wormSandGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A3B2A" />
                  <stop offset="40%" stopColor="#2E2319" />
                  <stop offset="80%" stopColor="#1C150E" />
                  <stop offset="100%" stopColor="#0F0B07" />
                </linearGradient>
                <linearGradient id="wormMawGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C84B1E" />
                  <stop offset="60%" stopColor="#4A1E0E" />
                  <stop offset="100%" stopColor="#1A0A04" />
                </linearGradient>
              </defs>

              {/* Massive segmented body arch */}
              <g stroke="#DAA520" strokeWidth="2.5" opacity="0.95">
                {/* Tail segments ascending */}
                <ellipse cx="150" cy="460" rx="45" ry="35" fill="url(#wormSandGradient)" />
                <ellipse cx="210" cy="400" rx="60" ry="48" fill="url(#wormSandGradient)" />
                <ellipse cx="280" cy="330" rx="75" ry="60" fill="url(#wormSandGradient)" />
                <ellipse cx="360" cy="270" rx="90" ry="72" fill="url(#wormSandGradient)" />

                {/* Main crest arch */}
                <ellipse cx="460" cy="230" rx="105" ry="85" fill="url(#wormSandGradient)" />
                <ellipse cx="570" cy="210" rx="120" ry="95" fill="url(#wormSandGradient)" />
                <ellipse cx="690" cy="220" rx="125" ry="100" fill="url(#wormSandGradient)" />

                {/* Head segment breaching forward */}
                <ellipse cx="810" cy="260" rx="115" ry="95" fill="url(#wormSandGradient)" />
              </g>

              {/* Segmented ring ridges */}
              <path
                d="M 210,360 Q 240,400 210,440 M 280,280 Q 320,330 280,380 M 360,210 Q 400,270 360,330 M 460,160 Q 510,230 460,300 M 570,130 Q 620,210 570,290 M 690,140 Q 740,220 690,300 M 810,180 Q 860,260 810,340"
                stroke="#B8860B"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* The Cavernous Maw (Three-lobed open mouth) */}
              <g transform="translate(850, 240)">
                {/* Deep interior fire/furnace */}
                <polygon
                  points="0,-60 90,-10 60,60 -30,40"
                  fill="url(#wormMawGradient)"
                  stroke="#DAA520"
                  strokeWidth="3"
                />

                {/* Crystalline Crysknife Teeth rows */}
                <g fill="#F5F0E6" stroke="#DAA520" strokeWidth="1">
                  <polygon points="10,-45 25,-40 15,-30" />
                  <polygon points="30,-35 45,-25 35,-15" />
                  <polygon points="50,-20 65,-10 50,0" />
                  <polygon points="55,0 70,15 50,20" />
                  <polygon points="40,20 50,40 30,35" />
                  <polygon points="15,35 25,50 5,40" />
                  <polygon points="-5,30 0,45 -15,35" />
                </g>

                {/* Inner iris maw center */}
                <circle cx="20" cy="0" r="14" fill="#0A0502" />
              </g>

              {/* Sand spray & dust clouds billowing at the base */}
              <g fill="#D9CBB0" opacity="0.6">
                <circle cx="160" cy="480" r="40" />
                <circle cx="230" cy="490" r="50" />
                <circle cx="750" cy="480" r="60" />
                <circle cx="850" cy="470" r="70" />
                <circle cx="940" cy="490" r="55" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Fremen Benediction Toast */}
      {showToast && (
        <div
          role="status"
          data-realm="fremen"
          className="fixed bottom-6 right-6 left-6 sm:left-auto z-[10000] max-w-md bg-bg text-ink border border-line p-5 rounded space-y-3"
        >
          <p className="t-meta text-mark">{easterEgg.title}</p>
          <p className="t-epigraph">{easterEgg.quote}</p>
          <p className="t-meta">{easterEgg.attribution}</p>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-line">
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="t-small min-h-11 px-3 text-ink-2 hover:text-ink transition-colors"
            >
              {easterEgg.dismiss}
            </button>
            <button
              type="button"
              onClick={() => triggerWorm()}
              className="t-small min-h-11 px-4 font-medium bg-accent text-accent-ink hover:bg-accent/90 transition-colors rounded"
            >
              {easterEgg.replay}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
