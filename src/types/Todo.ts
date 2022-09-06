import { User } from './User';

export interface Todo {
  user: User | null;
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}
