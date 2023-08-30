import type { CardProps } from '@/types/supabase/custom';
import { Fragment } from 'react';
import Card from '@/components/Card';

interface CardListProps {
  data: CardProps[];
}

const CardList: React.FC<CardListProps> = (props) => {
  return (
    <>
      {
        props.data && props.data.length > 0 && props.data.map((value, index) => {
          return (
            <Fragment key={`CardList-${index}`}>
              <Card
                cardType='old'
                cardName={value.title}
              />
            </Fragment>
          );
        })
      }
    </>
  );
};

export default CardList;
