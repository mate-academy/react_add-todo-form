import { User } from './user';

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user?: User | null,
}
