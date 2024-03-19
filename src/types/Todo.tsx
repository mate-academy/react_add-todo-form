import { User } from './User';

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  user: User;
  userId: number;
}
