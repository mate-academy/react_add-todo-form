import { User } from './user';

export interface Todo {
  title: string,
  completed: boolean,
  id: number,
  userId: number,
  user: User | null,
}
