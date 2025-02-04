import { User } from './User';

export interface Post {
  title: string;
  user: User | null;
  id: number;
  completed: boolean;
}
