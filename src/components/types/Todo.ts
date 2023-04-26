import { User } from './User';

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}
