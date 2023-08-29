import supabase from '@/utils/supabase';
import Input from '@/components/Input.tsx';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import CustomLink from '@/components/CustomLink';

import { useRouter } from 'next/router';

const Login: React.FC = () => {

  const router = useRouter();

  const handleUserLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    if ((email && typeof email === 'string') && (password && typeof password === 'string')) {

      const { error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
      );

      if (error) {
        // TODO add maybe UI for error?
        alert(error.message);

        return;
      }
    }

    router.push('/');
  };

  return (
    <div className="flex justify-center font-pier-sans">
      <form onSubmit={handleUserLogin} className="w-1/2 space-y-4">
        <Input label='Email' type='email' />
        <Input label='Password' type='password' />
        <div className="flex justify-between">
          <Button
            content="Login"
            type="submit"
          />
          <div className="flex flex-col items-end">
            <Typography
              content={'Don\'t have an account?'}
              className="text-blue/80"
              tag="p"
            />
            <CustomLink
              content='Register.'
              className='text-blue/80'
              href="/register"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
