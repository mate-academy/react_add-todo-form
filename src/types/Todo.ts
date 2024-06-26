import { User } from './User';

export type Todo = {
  user?: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
