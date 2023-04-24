import { User } from './user';

export interface Todo {
  user: User | null;
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}
