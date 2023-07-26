import { User } from './users';

export type Todo = {
  user?: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
