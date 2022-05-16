import { User } from './user';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User | null;
}
