import { User } from './User';

export interface TodoPrepared {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
