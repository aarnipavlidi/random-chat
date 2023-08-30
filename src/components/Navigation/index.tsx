import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';

import classNames from 'classnames';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

interface NavigationProps {
  currentAuthUser: User | null;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const router = useRouter();

  const handleUserLogout = async () => {
    await supabase.auth.signOut();

    router.push('/');
  };

  const headerContainer = classNames({
    ['w-screen h-20 mx-auto px-4 text-blue font-pier-sans md:container bg-inherit']: true,
  });

  const navContainer = classNames({
    'flex flex-col md:flex-row md:justify-between': true,
  });

  const navLinksContainer = classNames({
    'bg-inherit py-4 items-center gap-8 md:flex md:flex-row': true,
  });

  return (
    <header className={`${headerContainer}`}>
      <nav className={navContainer}>
        <div className="flex md:grow-0 flex-row py-4 items-center">
          <div className="flex grow md:grow-0 flex-row">
            <Icons
              name="TerminalTag"
              className='w-3 h-3 self-start'
              color="current"
            />
            <Typography
              content="Random Chat"
              tag="h2"
              size="3xl"
              className="px-2 2xl:text-4xl"
            />
            <Icons
              name="StackingBlock"
              className="w-4 h-2 self-end"
              color="current"
            />
          </div>
        </div>
        <div className={navLinksContainer}>
          {
            props.currentAuthUser && <div id="user-logout-link">
              <Button
                content='Logout'
                className="text-lg 2xl:text-xl"
                onClick={handleUserLogout}
              />
            </div>
          }
          {
            !props.currentAuthUser && <div id="user-login-link">
              <Link legacyBehavior={true} href="/login">
                <a className='text-lg 2xl:text-xl'>Login</a>
              </Link>
            </div>
          }
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
