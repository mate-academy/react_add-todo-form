import { User } from './types';

export interface ITodoInfo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  // user: User;
}
export interface Todo extends ITodoInfo {
  user?: User;
}
