import { User } from './User';

export interface Todo {
  id: number;
  userId: number | string;
  title: string;
  completed: boolean;
  user: User | null;
}
