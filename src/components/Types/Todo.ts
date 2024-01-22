import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | undefined;
}

export type Todos = Todo[];
