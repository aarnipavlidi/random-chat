import classNames from 'classnames';
import Input from '@/components/Input.tsx';
import Button from '@/components/Button';
import Typography from '../Typography';

interface CardProps {
  cardName?: string;
  cardAuthor?: string;
  cardType: 'new' | 'old';
  handleNewCard?: (event: React.FormEvent<HTMLFormElement>) => Promise<null | undefined>;
}

const Card: React.FC<CardProps> = (props) => {

  const formContainer = classNames({
    'flex flex-col w-64 aspect-square shadow shadow-neutral-500 rounded-2xl p-3 justify-between': true,
    'border border-neutral-500': props.cardType === 'old',
    'transition-all duration-300 hover:shadow-none': props.cardType === 'old',
  });

  return (
    <form className={formContainer} onClick={props.handleNewCard}>
      {
        props.cardType === 'new' && <>
          <Input
            label="Title"
            placeholder='Enter name for your chat.'
            type="text"
          />
          <Button
            type="submit"
            content="Create new chat"
            className="self-start"
            buttonSize='xs'
          />
        </>
      }
      {
        props.cardType === 'old' && <>
          <Typography
            content={props.cardName || ''}
            className="text-center px-2 py-2 rounded-xl bg-neutral-900 text-neutral-100 truncate w-full"
          />
          <div className="flex flex-row justify-between">
            <Typography
              content="10+"
              className="bg-neutral-200 self-start p-2 rounded-full"
              size="sm"
            />
            <div className="flex flex-col items-end">
              <Typography
                content={'Created by'}
                size='sm'
              />
              <Typography
                content='Aarni'
                size="sm"
              />
            </div>
          </div>
        </>
      }
    </form>
  );
};

export default Card;
