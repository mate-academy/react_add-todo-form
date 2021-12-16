import { User } from './User';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  user: User | null;
}
