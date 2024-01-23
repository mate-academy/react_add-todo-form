import { User } from './User';

export interface TodoAndUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
