import { User } from './User';

export interface Todo {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
  user: User | null;
}
