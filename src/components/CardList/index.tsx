import type { CardProps } from '@/types/supabase/custom';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Card from '@/components/Card';

interface CardListProps {
  data: CardProps[];
}

const CardList: React.FC<CardListProps> = (props) => {
  const router = useRouter();

  return (
    <>
      {
        props.data && props.data.length > 0 && props.data.map((value, index) => {
          return (
            <Fragment key={`CardList-${index}`}>
              <div onClick={() => router.push(`/card/${value.id}`)}>
                <Card
                  cardType='old'
                  cardName={value.title}
                />
              </div>
            </Fragment>
          );
        })
      }
    </>
  );
};

export default CardList;
