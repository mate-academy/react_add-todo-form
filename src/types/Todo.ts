import { User } from './User';

export interface Todo {
  user: User | null,
  userId: number | null,
  id: number,
  title: string,
}
