import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface NewTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
