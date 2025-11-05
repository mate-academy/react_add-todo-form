import { User } from './User';

export interface ToDo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}
