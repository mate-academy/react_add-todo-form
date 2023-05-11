import { User } from './User';

export interface Todo {
  title: string,
  completed: boolean,
  id: number,
  user: User | null,
}
