import { User } from './user';

export interface Todo {
  user: User | undefined;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
