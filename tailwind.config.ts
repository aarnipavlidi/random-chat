import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /text-(neutral)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ['md'],
    },
    {
      pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    },
    {
      pattern: /text-(left|center|right|justify|start|end)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        ['pier-sans']: ['var(--font-primary)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
