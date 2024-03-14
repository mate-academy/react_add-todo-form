import { User } from './User';

export interface TodoInterface {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
