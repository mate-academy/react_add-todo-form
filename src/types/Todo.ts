import { User } from './User';

export interface Todo {
  user: User | undefined;
  id: number;
  title: string;
  completed: boolean;
}
