import { User } from './user';

export interface TodoWithUser {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User | null;
}
