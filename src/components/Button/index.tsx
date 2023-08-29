import classNames from 'classnames';

import Typography from '@/components/Typography';
import Icons from '@/components/Icons';

interface ButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  content: string;
  onClick?: () => void;
  href?: string | null;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', ...props }) => {

  const buttonContainer = classNames({
    'rounded-bl-xl rounded-tr-xl py-2 px-4 flex self-baseline items-center': true,
    'border-2 border-blue shadow-blue shadow hover:shadow-none': true,
    'bg-blue text-lightGray': true,
    [`${props.className}`]: props.className,
  });

  return (
    <button id={props.id} type={type} className={`${buttonContainer}`} onClick={props.onClick}>
      <Typography
        content={props.content}
        tag="span"
      />
    </button>
  );
};

export default Button;
