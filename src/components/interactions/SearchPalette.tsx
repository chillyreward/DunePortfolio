'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { SearchItem } from '@/lib/search-items';
import { OPEN_SEARCH_EVENT } from '@/lib/toast';
import { switchThemeWithEclipse } from '@/lib/eclipse';
import { copyEmailToClipboard } from './CopyEmailButton';
import { cn } from '@/lib/cn';

export interface SearchPaletteProps {
  items: SearchItem[];
  labels: {
    dialogLabel: string;
    placeholder: string;
    empty: string;
    groups: Record<SearchItem['group'], string>;
    toDark: string;
    toLight: string;
  };
  email: string;
  copyDone: string;
  copyFailed: string;
  cvPath: string | null;
  cvFileName: string;
  whatsapp: string;
}

function initials(label: string) {
  return label
    .split(/[\s\-–&,()]+|(?=[A-Z][a-z])/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toLowerCase();
}

export function matches(item: SearchItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const text = `${item.label} ${item.hint ?? ''}`.toLowerCase();
  return text.includes(q) || initials(item.label).startsWith(q.replace(/\s+/g, ''));
}

// Ctrl+K / ⌘K palette: pages, projects, hackathons and a few actions.
export function SearchPalette({
  items,
  labels,
  email,
  copyDone,
  copyFailed,
  cvPath,
  cvFileName,
  whatsapp,
}: SearchPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const results = useMemo(
    () =>
      items
        .filter((i) => i.action !== 'download-cv' || cvPath)
        .map((i) => (i.action === 'toggle-theme' ? { ...i, label: isDark ? labels.toLight : labels.toDark } : i))
        .filter((i) => matches(i, query)),
    [items, query, isDark, labels.toDark, labels.toLight, cvPath]
  );

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, open);
    };
  }, [open, close]);

  const run = (item: SearchItem) => {
    close();
    if (item.href) {
      router.push(item.href);
      return;
    }
    switch (item.action) {
      case 'download-cv': {
        if (!cvPath) return;
        const a = document.createElement('a');
        a.href = cvPath;
        a.download = cvFileName;
        a.click();
        return;
      }
      case 'copy-email':
        copyEmailToClipboard(email, copyDone, copyFailed);
        return;
      case 'toggle-theme':
        switchThemeWithEclipse(() => setTheme(isDark ? 'light' : 'dark'));
        return;
      case 'whatsapp':
        window.open(whatsapp, '_blank', 'noopener,noreferrer');
        return;
    }
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(results.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[Math.min(active, results.length - 1)];
      if (item) run(item);
    }
  };

  useEffect(() => {
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const activeId = results.length ? `search-opt-${Math.min(active, results.length - 1)}` : undefined;
  let lastGroup: string | null = null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.dialogLabel}
      onClose={() => returnFocusRef.current?.focus()}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="w-[min(640px,calc(100%-32px))] max-h-[min(560px,80dvh)] mt-[12dvh] p-0 bg-bg text-ink border border-line rounded-[2px] backdrop:bg-ink/40 print:hidden"
    >
      <div className="flex flex-col max-h-[min(560px,80dvh)]">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-label={labels.placeholder}
          placeholder={labels.placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          className="w-full h-14 px-5 bg-transparent text-[17px] text-ink placeholder:text-ink-2 border-b border-line focus-visible:outline-none"
        />
        <ul id="search-results" role="listbox" aria-label={labels.dialogLabel} className="overflow-y-auto py-2">
          {results.length === 0 && (
            <li role="presentation" className="t-small text-ink-2 px-5 py-4">
              {labels.empty}
            </li>
          )}
          {results.map((item, i) => {
            const heading = item.group !== lastGroup ? labels.groups[item.group] : null;
            lastGroup = item.group;
            const selected = i === Math.min(active, results.length - 1);
            return (
              <React.Fragment key={item.id}>
                {heading && (
                  <li role="presentation" className="t-meta px-5 pt-3 pb-1">
                    {heading}
                  </li>
                )}
                <li
                  id={`search-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                  className={cn(
                    'flex items-baseline justify-between gap-4 px-5 min-h-11 py-2.5 cursor-pointer t-small',
                    selected ? 'bg-ink/[0.07] text-ink' : 'text-ink'
                  )}
                >
                  <span>{item.label}</span>
                  {item.hint && <span className="t-meta">{item.hint}</span>}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </dialog>
  );
}
