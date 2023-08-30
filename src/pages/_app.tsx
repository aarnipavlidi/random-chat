import type { AppProps } from 'next/app';
import type { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
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

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setCurrentUser(session?.user ?? null);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUserData();

    supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });
  }, []);

  return (
    <Layout fontVariable={`${fontPierSans.variable}`} currentAuthUser={currentUser}>
      <Component {...pageProps} currentAuthUser={currentUser} />
    </Layout>
  );
}
