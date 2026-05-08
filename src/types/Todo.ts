import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type PreparedTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
