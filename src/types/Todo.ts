import { User } from './User';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoUser extends Todo {
  user: User | null;
}
