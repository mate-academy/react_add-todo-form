import { User } from './user';

export interface Todo {
  user?: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
