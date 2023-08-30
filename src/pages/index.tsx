import type { User } from '@supabase/supabase-js';
import type { CardProps } from '@/types/supabase/custom';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';

import Typography from '@/components/Typography';
import Card from '@/components/Card';
import CardList from '@/components/CardList';

interface HomeSlugProps {
  currentAuthUser: User | null;
}

const HomeSlug: React.FC<HomeSlugProps> = ({ currentAuthUser }) => {
  const [currentCards, setCurrentCards] = useState<CardProps[]>([]);
  const router = useRouter();

  const handleNewCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentFormData = event.currentTarget;

    const { text } = Object.fromEntries(
      new FormData(currentFormData)
    );

    if ((text && typeof text === 'string' && text.trim().length !== 0)) {
      const { data, error } = await supabase
        .from('cards')
        .insert({
          title: text,
          author_name: currentAuthUser?.user_metadata.username || 'Random Author',
        })
        .select();

      if (error) {
        currentFormData.reset();
        alert(error.message);

        return;
      }

      if (data && data.length > 0) {
        currentFormData.reset();
        router.push(`/card/${data[0].id}`);
      }

      return null;
    }
  };

  useEffect(() => {

    const getAllCurrentCards = async () => {
      const { data } = await supabase
        .from('cards')
        .select('*, users(username)');

      if (!data) {
        return;
      }

      const checkCurrentCards = Object.values(data).filter(value => value.users?.username);
      setCurrentCards([...checkCurrentCards]);
    };

    getAllCurrentCards();
  }, []);

  useEffect(() => {
    const listenForChanges = supabase
      .channel('table-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cards' }, payload => {
        setCurrentCards((currentCards) => [...currentCards, payload.new] as CardProps[]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(listenForChanges);
    };
  });

  return (
    <div className="font-pier-sans text-neutral-900">
      {
        !currentAuthUser && <div className="flex w-full justify-end">
          <Typography
            content="You need to be logged in to be able to create cards and send messages inside the cards."
            className="max-w-prose"
            size="lg"
          />
        </div>
      }
      <div className="flex flex-wrap py-8 gap-4 justify-center lg:justify-normal">
        {
          currentAuthUser && <Card
            cardType='new'
            handleNewCard={handleNewCard}
          />
        }
        {
          currentCards && currentCards.length > 0 && <CardList
            data={currentCards}
          />
        }
      </div>
    </div>
  );
};

export default HomeSlug;
