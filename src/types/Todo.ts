import { User } from './User';

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  user: User | null;
};
