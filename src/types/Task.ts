import { User } from './User';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
