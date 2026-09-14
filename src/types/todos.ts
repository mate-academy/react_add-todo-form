import { User } from './users';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
