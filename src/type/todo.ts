import { User } from './user';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number | undefined;
  user: User | undefined;
}
