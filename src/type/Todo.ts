import { User } from './User';

export interface Todo {
  id: number | string;
  title: string;
  userId: number;
  completed: boolean,
  user: User | null;
}
