import { User } from './User';

export interface Todo {
  user: User,
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
