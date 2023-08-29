import { CustomIconsProps, CustomIconsArrayProps } from '@/types/icons';

// Custom Icons
import StackingBlock from '@/components/Svg/icons/Custom/StackingBlock';
import TerminalTag from '@/components/Svg/icons/Custom/TerminalTag';

const Icons: React.FC<CustomIconsProps> = ({ name, variant = 'solid', ...props }) => {

  const IconsArray: CustomIconsArrayProps = {
    'StackingBlock': StackingBlock,
    'TerminalTag': TerminalTag,
  };

  const Icon = IconsArray[name];

  return (
    <Icon
      name={name}
      variant={variant}
      {...props}
    />
  );
};

export default Icons;
