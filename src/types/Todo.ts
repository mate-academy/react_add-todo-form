import { User } from './User';

export type Todo = {
  user: User | undefined;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
