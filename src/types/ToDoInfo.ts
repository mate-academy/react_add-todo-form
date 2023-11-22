import { User } from './User';

export interface ToDoInfo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoUser extends ToDoInfo {
  user?: User | null;
}
