import { User } from './User';

export interface TodoItem {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
