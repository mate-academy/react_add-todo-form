import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
