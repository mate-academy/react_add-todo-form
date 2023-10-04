import { User } from './User';

export type Todo = {
  user: User | null
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
