import { CustomIconsProps } from '@/types/icons';

const StackingBlock: React.FC<CustomIconsProps> = ({ variant = 'solid', color, className, ...props }) => {
  return (
    <svg
      id={props.name}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 4 2"
      className={`${className} text-${color}`}
      {...props}
    >
      {
        variant === 'solid' && <>
          <path d="M1 0h1v1H1V0ZM3 1h1v1H3V1ZM0 0h1v1H0V0ZM2 1h1v1H2V1Z" />
        </>
      }
    </svg>
  );
};

export default StackingBlock;
