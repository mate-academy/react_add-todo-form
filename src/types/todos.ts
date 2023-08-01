import { User } from './users';

export interface Todo {
  user?: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
