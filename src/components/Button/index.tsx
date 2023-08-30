import type { TypographyProps } from '@/components/Typography';
import classNames from 'classnames';
import Typography from '@/components/Typography';
import Icons from '@/components/Icons';

interface ButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  buttonSize?: TypographyProps['size'];
  className?: string;
  content: string;
  onClick?: () => void;
  href?: string | null;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', buttonSize = 'base', ...props }) => {

  const buttonContainer = classNames({
    'rounded-bl-xl rounded-tr-xl py-2 px-4 flex': true,
    'border-2 border-neutral-500': true,
    [`${props.className}`]: props.className,
  });

  return (
    <button id={props.id} type={type} className={`${buttonContainer}`} onClick={props.onClick}>
      <Typography
        content={props.content}
        tag="span"
        size={buttonSize}
      />
    </button>
  );
};

export default Button;
