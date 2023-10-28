import { User } from './User';

export interface Todo {
  id: number,
  title: string,
  completed: false,
  userId: number,
  user: User | null,
}
