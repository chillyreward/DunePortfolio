import { Archivo } from 'next/font/google';

export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'], // variable width axis 62–125
  variable: '--font-archivo',
  display: 'swap',
});
