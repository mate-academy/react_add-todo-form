import { User } from './User';

export interface Todo {
  userId: number | string;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
