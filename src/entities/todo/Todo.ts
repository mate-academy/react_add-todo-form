import { User } from '../user/User';

export interface Todo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
