export interface ColorTokenValues {
  bg: string;
  surface: string;
  ink: string;
  ink2: string;
  accent: string;
  accentInk: string;
  spice: string;
  mark: string;
  line: string;
  lineAlpha: string;
  colorScheme: 'light' | 'dark';
}

export type RealmTokenValues = Pick<
  ColorTokenValues,
  'bg' | 'surface' | 'ink' | 'ink2' | 'mark' | 'line' | 'lineAlpha' | 'colorScheme'
>;

export const baseModes: Record<'arrakis' | 'giedi', ColorTokenValues> = {
  arrakis: {
    bg: '217 203 176', // #D9CBB0 sand
    surface: '239 231 216', // #EFE7D8 bone
    ink: '35 29 20', // #231D14 shadow
    ink2: '87 78 64', // #574E40 stone
    accent: '30 69 200', // #1E45C8 Ibad blue
    accentInk: '255 255 255',
    spice: '200 128 26', // #C8801A
    mark: '30 69 200', // Matches accent in base arrakis
    line: '35 29 20',
    lineAlpha: '0.18',
    colorScheme: 'light',
  },
  giedi: {
    bg: '0 0 0', // #000000
    surface: '22 22 22', // #161616
    ink: '242 242 242', // #F2F2F2
    ink2: '163 163 163', // #A3A3A3
    accent: '127 151 255', // #7F97FF
    accentInk: '0 0 0',
    spice: '200 128 26', // #C8801A
    mark: '127 151 255',
    line: '255 255 255',
    lineAlpha: '0.14',
    colorScheme: 'dark',
  },
};

export const realmTokens: Record<'fremen' | 'atreides' | 'corrino', RealmTokenValues> = {
  fremen: {
    bg: '42 45 46', // #2A2D2E stillsuit grey
    surface: '54 58 60', // #363A3C
    ink: '235 230 220', // #EBE6DC
    ink2: '170 175 178', // #AAAFB2
    mark: '218 165 32', // #DAA520 sand gold
    line: '235 230 220',
    lineAlpha: '0.15',
    colorScheme: 'dark',
  },
  atreides: {
    bg: '20 28 24', // #141C18 deep forest slate
    surface: '28 38 33', // #1C2621
    ink: '240 242 238', // #F0F2EE
    ink2: '160 172 165', // #A0ACA5
    mark: '197 160 89', // #C5A059 hawk gold
    line: '240 242 238',
    lineAlpha: '0.15',
    colorScheme: 'dark',
  },
  corrino: {
    bg: '245 240 230', // #F5F0E6 imperial parchment
    surface: '235 228 215', // #EBE4D7
    ink: '28 24 36', // #1C1824 regal violet-slate
    ink2: '90 82 100', // #5A5264
    mark: '166 118 8', // #A67608 imperial gold (calibrated for >=3:1 contrast on parchment)
    line: '28 24 36',
    lineAlpha: '0.15',
    colorScheme: 'light',
  },
};

export const giediRealmTokens: Record<'fremen' | 'atreides' | 'corrino', RealmTokenValues> = {
  fremen: {
    bg: '13 13 13', // #0D0D0D
    surface: '24 24 24', // #181818
    ink: '240 240 240', // #F0F0F0
    ink2: '160 160 160', // #A0A0A0
    mark: '200 200 200', // #C8C8C8
    line: '240 240 240',
    lineAlpha: '0.14',
    colorScheme: 'dark',
  },
  atreides: {
    bg: '10 15 12', // #0A0F0C
    surface: '20 26 22', // #141A16
    ink: '240 240 240', // #F0F0F0
    ink2: '155 165 158', // #9BA59E
    mark: '190 190 190', // #BEBEBE
    line: '240 240 240',
    lineAlpha: '0.14',
    colorScheme: 'dark',
  },
  corrino: {
    bg: '18 16 20', // #121014
    surface: '28 25 32', // #1C1920
    ink: '240 238 242', // #F0EEF2
    ink2: '160 155 168', // #A09BA8
    mark: '210 205 195', // #D2CDC3
    line: '240 238 242',
    lineAlpha: '0.14',
    colorScheme: 'dark',
  },
};

export type RealmName = 'arrakis' | 'fremen' | 'atreides' | 'corrino';
export type ThemeMode = 'arrakis' | 'giedi';
