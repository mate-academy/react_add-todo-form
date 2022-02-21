import { User } from './User';

export interface Todo {
  user: User | null,
  id: number,
  title: string,
  completed: boolean,
}
