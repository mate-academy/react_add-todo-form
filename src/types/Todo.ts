import { User } from './User';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
