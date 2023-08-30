import type { User } from '@supabase/supabase-js';
import type { CardProps } from '@/types/supabase/custom';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';

import Card from '@/components/Card';
import CardList from '@/components/CardList';

interface HomeProps {
  currentAuthUser: User | null;
}

const Home: React.FC<HomeProps> = ({ currentAuthUser }) => {
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
      .channel('any')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cards' }, payload => {
        setCurrentCards((currentCards) => [...currentCards, payload.new] as CardProps[]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(listenForChanges);
    };
  });

  return (
    <div className="flex flex-wrap font-pier-sans text-neutral-900 space-x-6">
      <Card
        cardType='new'
        handleNewCard={handleNewCard}
      />
      {
        currentCards && currentCards.length > 0 && <CardList
          data={currentCards}
        />
      }
    </div>
  );
};

export default Home;
