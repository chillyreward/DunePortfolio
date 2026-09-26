'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export function ThemeSync() {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme');
    if (t === 'arrakis' || t === 'giedi') {
      setTheme(t);
    }
  }, [setTheme]);

  return null;
}
