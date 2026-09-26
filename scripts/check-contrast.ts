import { baseModes, realmTokens, giediRealmTokens } from '../src/design/tokens';

function parseRgb(rgbStr: string): [number, number, number] {
  const parts = rgbStr.trim().split(/\s+/).map(Number);
  if (parts.length < 3 || parts.some(isNaN)) {
    throw new Error(`Invalid RGB triplet: "${rgbStr}"`);
  }
  return [parts[0], parts[1], parts[2]];
}

function sRGBtoLin(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getLuminance(rgb: [number, number, number]): number {
  return 0.2126 * sRGBtoLin(rgb[0]) + 0.7152 * sRGBtoLin(rgb[1]) + 0.0722 * sRGBtoLin(rgb[2]);
}

function getContrast(fg: [number, number, number], bg: [number, number, number]): number {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface ContrastCheck {
  scope: string;
  pair: string;
  fgName: string;
  fgRgb: [number, number, number];
  bgName: string;
  bgRgb: [number, number, number];
  minRatio: number;
}

function main() {
  const checks: ContrastCheck[] = [
    // Base Arrakis
    {
      scope: 'Mode: Arrakis',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(baseModes.arrakis.ink),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.arrakis.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Mode: Arrakis',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(baseModes.arrakis.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.arrakis.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Mode: Arrakis',
      pair: 'accent on bg',
      fgName: 'accent',
      fgRgb: parseRgb(baseModes.arrakis.accent),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.arrakis.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Mode: Arrakis',
      pair: 'accent-ink on accent',
      fgName: 'accent-ink',
      fgRgb: parseRgb(baseModes.arrakis.accentInk),
      bgName: 'accent',
      bgRgb: parseRgb(baseModes.arrakis.accent),
      minRatio: 4.5,
    },

    // Base Giedi
    {
      scope: 'Mode: Giedi',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(baseModes.giedi.ink),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.giedi.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Mode: Giedi',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(baseModes.giedi.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.giedi.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Mode: Giedi',
      pair: 'accent on bg',
      fgName: 'accent',
      fgRgb: parseRgb(baseModes.giedi.accent),
      bgName: 'bg',
      bgRgb: parseRgb(baseModes.giedi.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Mode: Giedi',
      pair: 'accent-ink on accent',
      fgName: 'accent-ink',
      fgRgb: parseRgb(baseModes.giedi.accentInk),
      bgName: 'accent',
      bgRgb: parseRgb(baseModes.giedi.accent),
      minRatio: 4.5,
    },

    // Realm: Fremen (Arrakis)
    {
      scope: 'Realm: Fremen (Arrakis)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(realmTokens.fremen.ink),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.fremen.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Fremen (Arrakis)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(realmTokens.fremen.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.fremen.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Fremen (Arrakis)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(realmTokens.fremen.mark),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.fremen.bg),
      minRatio: 3.0,
    },

    // Realm: Atreides (Arrakis)
    {
      scope: 'Realm: Atreides (Arrakis)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(realmTokens.atreides.ink),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.atreides.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Atreides (Arrakis)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(realmTokens.atreides.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.atreides.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Atreides (Arrakis)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(realmTokens.atreides.mark),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.atreides.bg),
      minRatio: 3.0,
    },

    // Realm: Corrino (Arrakis)
    {
      scope: 'Realm: Corrino (Arrakis)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(realmTokens.corrino.ink),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.corrino.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Corrino (Arrakis)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(realmTokens.corrino.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.corrino.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Corrino (Arrakis)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(realmTokens.corrino.mark),
      bgName: 'bg',
      bgRgb: parseRgb(realmTokens.corrino.bg),
      minRatio: 3.0,
    },

    // Realm: Fremen (Giedi)
    {
      scope: 'Realm: Fremen (Giedi)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(giediRealmTokens.fremen.ink),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.fremen.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Fremen (Giedi)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(giediRealmTokens.fremen.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.fremen.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Fremen (Giedi)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(giediRealmTokens.fremen.mark),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.fremen.bg),
      minRatio: 3.0,
    },

    // Realm: Atreides (Giedi)
    {
      scope: 'Realm: Atreides (Giedi)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(giediRealmTokens.atreides.ink),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.atreides.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Atreides (Giedi)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(giediRealmTokens.atreides.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.atreides.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Atreides (Giedi)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(giediRealmTokens.atreides.mark),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.atreides.bg),
      minRatio: 3.0,
    },

    // Realm: Corrino (Giedi)
    {
      scope: 'Realm: Corrino (Giedi)',
      pair: 'ink on bg',
      fgName: 'ink',
      fgRgb: parseRgb(giediRealmTokens.corrino.ink),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.corrino.bg),
      minRatio: 7.0,
    },
    {
      scope: 'Realm: Corrino (Giedi)',
      pair: 'ink-2 on bg',
      fgName: 'ink-2',
      fgRgb: parseRgb(giediRealmTokens.corrino.ink2),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.corrino.bg),
      minRatio: 4.5,
    },
    {
      scope: 'Realm: Corrino (Giedi)',
      pair: 'mark on bg',
      fgName: 'mark',
      fgRgb: parseRgb(giediRealmTokens.corrino.mark),
      bgName: 'bg',
      bgRgb: parseRgb(giediRealmTokens.corrino.bg),
      minRatio: 3.0,
    },
  ];

  console.log('=== WCAG 2.1 Contrast Gate Verification ===\n');

  let failedCount = 0;
  const tableData: Array<{
    Scope: string;
    Pair: string;
    Foreground: string;
    Background: string;
    Ratio: string;
    Required: string;
    Status: string;
  }> = [];

  for (const c of checks) {
    const ratio = getContrast(c.fgRgb, c.bgRgb);
    const passed = ratio >= c.minRatio;
    if (!passed) failedCount++;

    tableData.push({
      Scope: c.scope,
      Pair: c.pair,
      Foreground: `rgb(${c.fgRgb.join(' ')})`,
      Background: `rgb(${c.bgRgb.join(' ')})`,
      Ratio: `${ratio.toFixed(2)}:1`,
      Required: `>= ${c.minRatio.toFixed(1)}:1`,
      Status: passed ? 'PASS' : 'FAIL',
    });
  }

  console.table(tableData);

  if (failedCount > 0) {
    console.error(`\nFAILED: ${failedCount} contrast check(s) did not meet WCAG requirements.`);
    process.exit(1);
  }

  console.log(`\nAll ${checks.length} contrast checks PASSED successfully.`);
}

main();
