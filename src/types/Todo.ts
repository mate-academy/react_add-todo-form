import { User } from './User';

export interface Todo {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
  user: User | null,
}
