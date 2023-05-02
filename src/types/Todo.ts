import { User } from './User';

export interface Todo {
  id: number,
  userId: number | undefined,
  title: string,
  completed: boolean,
  user: User | null,
}
