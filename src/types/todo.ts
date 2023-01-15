import { User } from './user';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number;
}

export interface ExtendedTodo extends Todo {
  user: User | null,
}
