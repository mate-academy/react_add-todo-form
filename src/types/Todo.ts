import { User } from './User';

export interface Todo {
  id: number;
  completed: boolean;
  title: string;
  userId: number;
  user: User | null;
}
