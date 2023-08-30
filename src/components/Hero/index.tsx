import { useRouter } from 'next/router';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';

interface HeroProps {
  variant?: 'backButton'
  wrapperClass?: string;
  title: string;
}

const Hero: React.FC<HeroProps> = ({ variant = 'backButton', ...props }) => {
  const router = useRouter();

  return (
    <div className={props.wrapperClass} onClick={() => router.back()}>
      {
        variant === 'backButton' && props.title && <>
          <Icons
            name="arrow-uturn-left"
            className='w-6'
            color="current"
          />
          <Typography
            content={props.title}
            size='sm'
          />
        </>
      }
    </div>
  );
};

export default Hero;
