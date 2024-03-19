import { User } from './User';

export interface ITodoInfo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
  userId: number;
}
