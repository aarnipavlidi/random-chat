import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';
import Input from '@/components/Input.tsx';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import CustomLink from '@/components/CustomLink';

const Register: React.FC = () => {
  const router = useRouter();

  const handleUserRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, username, password } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    if ((email && typeof email === 'string') && (username && typeof username === 'string') && (password && typeof password === 'string')) {

      const { data, error } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        },
      );

      if (error) {
        // TODO add maybe UI for error?
        alert(error.message);

        return;
      }

      if (data.user) {
        router.push('/');
      }
    }

    return null;
  };

  return (
    <div className="flex justify-center font-pier-sans">
      <form onSubmit={handleUserRegister} className="w-1/2 space-y-4">
        <Input label='Email' placeholder='Enter your email.' type='email' />
        <Input label='Username' type='username' />
        <Input label='Password' type='password' />
        <div className="flex justify-between">
          <Button
            content="Register"
            type='submit'
          />
          <div className="flex flex-col items-end">
            <Typography
              content="Already have an account?"
              className="text-blue/80"
              tag="p"
            />
            <CustomLink
              content='Login.'
              className='text-blue/80'
              href="/login"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
