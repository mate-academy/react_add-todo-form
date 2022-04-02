import { User } from './User';

export interface Todo {
  user: User | null;
  userId: number | null;
  todoId: number;
  title: string;
  completed: boolean;
}
