import { User } from './User';

export type TodoId = number;

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface CompletedTodo extends Todo {
  user: User | null;
}
