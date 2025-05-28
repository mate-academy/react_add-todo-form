import { User } from './user';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
};
