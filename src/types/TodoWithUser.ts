import { User } from './User';

export interface TodoWithUser {
  id: number;
  title: string;
  completed: boolean;
  user: User;
  userId: number
}
