import { User } from './User';

export interface Todo {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
