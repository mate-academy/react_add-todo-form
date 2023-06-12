import { User } from './user';

export interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean
  user: User | null;
}
