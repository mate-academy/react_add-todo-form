import { User } from './user';

export interface Todo {
  id: number,
  completed: boolean,
  user: User | null,
  title: string,
  userId: number,
}
