'use client';

import { useEffect, useState } from 'react';
import { TOAST_EVENT } from '@/lib/toast';

// One polite live region for short confirmations ("Email address copied").
export function ToastHost() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 2600);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none print:hidden"
    >
      {message && (
        <p className="t-small bg-ink text-bg px-4 py-3 rounded-[2px]">{message}</p>
      )}
    </div>
  );
}
