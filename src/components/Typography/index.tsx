import classNames from 'classnames';

export interface TypographyProps {
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  content: string;
}

const Typography: React.FC<TypographyProps> = ({ className, tag = 'p', size = 'base', align, content }) => {
  const typographyStringContainer = classNames({
    [`text-${size}`]: true,
    [`${className}`]: className,
    [`text-${align}`]: align,
  });

  const TypographyTag = tag as keyof JSX.IntrinsicElements;

  return (
    <>
      {
        typeof(content) === 'string' && content && <>
          <TypographyTag className={typographyStringContainer}>
            {content}
          </TypographyTag>
        </>
      }
    </>
  );
};

export default Typography;
