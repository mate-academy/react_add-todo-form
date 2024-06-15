import { User } from './User';

export interface TodoWithUsers {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
