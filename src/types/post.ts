import { User } from './user';

export interface Post {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
