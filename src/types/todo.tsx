import { User } from './user';

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
