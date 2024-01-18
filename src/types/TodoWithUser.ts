import { User } from './User';

export interface TodoWithUser {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
