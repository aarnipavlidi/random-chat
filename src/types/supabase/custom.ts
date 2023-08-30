export interface CardProps {
  id: string;
  title: string;
  users: {
    username: string | null;
  } | null;
};

export interface CurrentCardProps {
  author_id: string;
  author_name: string;
  created_at: string;
  id: string;
  title: string;
};

export interface CurrentCardMessageProps {
   author_id: string;
  author_name: string;
  cardID: string;
  content: string;
  created_at: string;
  id: string;
};
