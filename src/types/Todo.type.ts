import { User } from './User.type';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};
