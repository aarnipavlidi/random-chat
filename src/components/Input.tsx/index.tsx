import Typography from '@/components/Typography';

interface InputProps {
  label?: string;
  placeholder?: string;
  type: 'email' | 'username' | 'password' | 'text';
  variant?: 'default' | 'full-width'
};

const Input: React.FC<InputProps> = ({ variant = 'default', ...props }) => {
  return (
    <>
      {
        props.label && props.type && variant === 'default' && <div className="flex flex-col gap-2">
          <Typography
            content={props.label}
            className='text-neutral-900'
          />
          <input
            placeholder={props.placeholder}
            type={props.type}
            name={props.type}
            className="font-sans placeholder-neutral-900/50 text-neutral-900 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/50"
          />
        </div>
      }
      {
        props.type && variant === 'full-width' && <div className="flex w-full">
          <input
            placeholder={props.placeholder}
            type={props.type}
            name={props.type}
            className="font-sans w-full placeholder-neutral-900/50 text-neutral-900 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/50"
          />
        </div>
      }
    </>
  );
};

export default Input;
