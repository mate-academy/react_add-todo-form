import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number | undefined;
  user: User | null | undefined;
}
