import { User } from './User';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  user: User | null;
  completed: boolean;
}
