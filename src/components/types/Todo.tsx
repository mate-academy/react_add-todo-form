import { User } from './User';

export type Todo = {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
};
