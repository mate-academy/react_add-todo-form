import { User } from './UserInterface';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
}
