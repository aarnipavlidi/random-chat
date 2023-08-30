import { CustomIconsProps } from '@/types/icons';

const ArrowUturnLeft: React.FC<CustomIconsProps> = ({ variant = 'solid', color, className, ...props }) => {

  return (
    <svg
      id={props.name}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`${className} text-${color}`}
      {...props}
    >
      {
        variant === 'outline' && <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </>
      }
      {
        variant === 'solid' && <>
          <path
            fillRule="evenodd"
            d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0z"
            clipRule="evenodd"
          />
        </>
      }
      {
        variant === 'mini' && <>
          <path
            fillRule="evenodd"
            d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025z"
            clipRule="evenodd"
          />
        </>
      }
    </svg>
  );
};

export default ArrowUturnLeft;
