import { User } from './types';
export interface ITodoInfo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
export interface Todo extends ITodoInfo {
  user?: User;
}
