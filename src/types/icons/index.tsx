import { SVGProps } from 'react';

type CustomIconNameType = 'StackingBlock' | 'TerminalTag';

export interface CustomIconsProps extends SVGProps<SVGSVGElement> {
  name: CustomIconNameType
  variant?: 'solid' | 'outline' | 'mini';
  color: 'current' | 'inherit';
  className?: string;
  animation?: boolean;
};

export type CustomIconsArrayProps = {
  [key in CustomIconsProps['name']]: React.FC<CustomIconsProps>;
};
