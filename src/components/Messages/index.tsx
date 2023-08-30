import type { CurrentCardMessageProps } from '@/types/supabase/custom';
import { Fragment } from 'react';
import Typography from '../Typography';

interface MessagesProps {
  currentAuthUserID?: string;
  data: CurrentCardMessageProps[];
  wrapperClass?: string;
  className?: string;
}

const Messages: React.FC<MessagesProps> = (props) => {

  return (
    <>
      <div className={`${props.wrapperClass}`}>
        {
          props.data && props.data.length > 0 && props.data.map((value, index) => {
            return (
              <Fragment key={`Messages-${index}`}>
                <div className={value.author_id === props.currentAuthUserID ? 'self-end flex flex-col items-end px-4' : 'self-start px-4'}>
                  <Typography
                    content={value.content}
                    className={value.author_id === props.currentAuthUserID ? `${props.className} bg-neutral-500` : `${props.className} bg-neutral-900`}
                  />
                  <Typography
                    content={value.author_name}
                    className="text-neutral-900 px-2 pt-1"
                    size="xs"
                  />
                </div>
              </Fragment>
            );
          })
        }
      </div>
    </>
  );
};

export default Messages;
