import { User } from './user';

export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
};
