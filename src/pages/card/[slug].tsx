import type { GetServerSideProps } from 'next';
import type { User } from '@supabase/supabase-js';
import type { CurrentCardProps, CurrentCardMessageProps } from '@/types/supabase/custom';
import { useRef, useState, useEffect } from 'react';
import supabase from '@/utils/supabase';

import Hero from '@/components/Hero';
import Input from '@/components/Input.tsx';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import Messages from '@/components/Messages';

interface CardSlugProps {
  currentAuthUser: User | null;
  getCardData: CurrentCardProps;
  getCardMessages: CurrentCardMessageProps[]
}

const CardSlug: React.FC<CardSlugProps> = ({ currentAuthUser, ...props }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [cardData, setCardData] = useState(props.getCardData);
  const [messages, setMessages] = useState(props.getCardMessages);

  const scrollContainerBottomAuto = () => {
    if (messageContainerRef.current) {
      const { scrollHeight, clientHeight } = messageContainerRef.current;
      messageContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollContainerBottomAuto();
  }, [messages]);

  useEffect(() => {
    const listenForChanges = supabase
      .channel('table-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `cardID=eq.${cardData.id}` }, payload => {
        setMessages((currentMessages) => [...currentMessages, payload.new] as CurrentCardMessageProps[]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(listenForChanges);
    };
  });

  const handleUserMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentFormData = event.currentTarget;

    const { text } = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    if ((text && typeof text === 'string' && text.trim().length !== 0) ) {

      const { data, error } = await supabase
        .from('messages')
        .insert({
          author_name: currentAuthUser?.user_metadata.username || 'Random Author',
          cardID: cardData.id,
          content: text,
        })
        .select();

      if (error) {
        currentFormData.reset();
        alert(error.message);

        return;
      }

      if (data && data.length > 0) {
        currentFormData.reset();
        scrollContainerBottomAuto();

        return;
      }
    }

    return null;
  };

  return (
    <div className="flex flex-col py-4 gap-y-4 relative h-[calc(100vh-80px)] font-pier-sans text-neutral-900">
      {
        cardData && cardData.title && <div className="flex w-3/5 mb-4 justify-between self-center bg-neutral-200/30 px-4 py-4 rounded-full">
          <Hero
            title="Go Back"
            wrapperClass='flex flex-row gap-2 items-center'
          />
          <Typography
            content={cardData.title}
            className=""
            size="lg"
          />
        </div>
      }
      {
        messages && messages.length > 0 && <div ref={messageContainerRef} className="flex w-3/5 self-center overflow-y-scroll h-full">
          <Messages
            currentAuthUserID={currentAuthUser?.id}
            data={messages}
            wrapperClass='w-full space-y-3 flex flex-col px-2 py-2'
            className='text-neutral-100 px-4 py-2 rounded-xl'
          />
        </div>
      }
      {
        currentAuthUser && <form className="flex flex-row w-3/5 self-center gap-4" onClick={handleUserMessage}>
          <Input
            variant="full-width"
            type="text"
          />
          <Button
            content='Send'
            type='submit'
          />
        </form>
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const getCurrentSlug = context.params?.slug || '';

  const { data: getCurrentCard, error: getCurrentCardError } = await supabase
    .from('cards')
    .select('*')
    .eq('id', getCurrentSlug)
    .single();

  if (getCurrentCardError || !getCurrentSlug) {
    return {
      notFound: true,
    };
  }

  const { data: getReferencedMessages } = await supabase
    .from('messages')
    .select('*')
    .eq('cardID', getCurrentSlug);

  return {
    props: {
      getCardData: getCurrentCard,
      getCardMessages: getReferencedMessages || [],
    },
  };
};

export default CardSlug;
