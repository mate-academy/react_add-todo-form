import { User } from './User';

export interface Todo {
  user: User | null,
  title: string,
  completed: boolean,
  userId: number,
  id: number,
}
