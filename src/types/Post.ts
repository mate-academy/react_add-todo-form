import { User } from './User';

export type Post = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
