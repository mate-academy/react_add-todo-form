import { User } from './user';

export interface TodoUser {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
