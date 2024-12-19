import { User } from './User';

export interface Todo {
  user: User | null;
  body: string;
  completed: boolean;
  id: number;
  userId: number;
  title: string;
}
