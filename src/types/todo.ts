import { User } from './user';

export type Todo = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
