import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  user: User | null;
  completed: boolean;
};
