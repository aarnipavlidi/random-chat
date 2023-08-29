import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      lightGray: '#f4f5f7',
      red: '#c72138',
      orange: '#e06236',
      yellow: '#d7a64b',
      blue: '#304c7a',
    },
    extend: {
      fontFamily: {
        ['pier-sans']: ['var(--font-primary)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
