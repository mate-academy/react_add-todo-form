import { User } from './UserType';

export interface Post {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
