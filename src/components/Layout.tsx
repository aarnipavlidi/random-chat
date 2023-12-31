import type { User } from '@supabase/supabase-js';

interface LayoutProps {
  fontVariable?: string;
  children: React.ReactNode;
  currentAuthUser: User | null;
}

import Navigation from '@/components/Navigation';

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={`${props.fontVariable} flex flex-col min-h-screen`}>
      <Navigation currentAuthUser={props.currentAuthUser} />
      <main className={'w-screen mx-auto grow px-4 md:container'}>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
