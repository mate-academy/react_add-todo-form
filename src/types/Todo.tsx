import { User } from './User';

export interface Todo {
  id: number;
  user?: User | null;
  title: string;
  completed: boolean;
}
