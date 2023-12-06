import { User } from './User';

export type Todo = {
  title: string;
  completed: boolean;
  user: User | null;
  id: number;
  userId: number;
};
