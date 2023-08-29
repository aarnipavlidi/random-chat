import Typography from '@/components/Typography';

interface InputProps {
  label: string;
  placeholder?: string;
  type: 'email' | 'username' | 'password';
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {
        props.label && props.type && <div className="flex flex-col gap-2">
          <Typography
            content={props.label}
            className='text-blue'
          />
          <input
            placeholder={props.placeholder}
            type={props.type}
            name={props.type}
            className="font-sans placeholder-blue/50 text-blue px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/50"
          />
        </div>
      }
    </>
  );
};

export default Input;
