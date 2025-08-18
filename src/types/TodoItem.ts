import { User } from './user';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}
