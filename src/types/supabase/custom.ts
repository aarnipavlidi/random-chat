export interface CardProps {
  id: string;
  title: string;
  users: {
    username: string | null;
  } | null;
};
