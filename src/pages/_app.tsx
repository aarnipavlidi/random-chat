import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

import '@/styles/globals.css';
import localFont from 'next/font/local';


const fontPierSans = localFont({
  src: [
    {
      path: '../../assets/fonts/PierSans/PPPierSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/PierSans/PPPierSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/PierSans/PPPierSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-primary',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout fontVariable={`${fontPierSans.variable}`}>
      <Component {...pageProps} />
    </Layout>
  );
}
