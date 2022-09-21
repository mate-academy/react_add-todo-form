import { User } from './User';

export interface TODO {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}
