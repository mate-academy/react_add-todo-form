import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
};
