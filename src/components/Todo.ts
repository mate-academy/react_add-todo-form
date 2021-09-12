 import { User } from './User';

export interface Todo {
  id: number;
  userId: number;
  user: User | null;
  title: string;
  completed: boolean;
}
