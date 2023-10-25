import { User } from './user';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface Todos extends Todo{
  user: User | null,
}
