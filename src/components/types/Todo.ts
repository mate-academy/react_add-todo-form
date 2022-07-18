import { User } from './User';

export interface Todo {
  userId: number | null,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}
