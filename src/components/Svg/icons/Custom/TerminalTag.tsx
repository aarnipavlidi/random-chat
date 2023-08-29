import { CustomIconsProps } from '@/types/icons';

const TerminalTag: React.FC<CustomIconsProps> = ({ variant = 'solid', color, className, ...props }) => {

  return (
    <svg
      id={props.name}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 2 2"
      className={`${className} text-${color}`}
      {...props}
    >
      {
        variant === 'solid' && <>
          <path d="M1 0h1v1H1V0ZM0 1h1v1H0V1ZM1 1h1v1H1V1Z" />
        </>
      }
    </svg>
  );
};

export default TerminalTag;
