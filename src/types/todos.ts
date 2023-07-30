import { User } from './users';

export interface Todo {
  user?: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
