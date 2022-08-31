import { User } from './User';

export interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
