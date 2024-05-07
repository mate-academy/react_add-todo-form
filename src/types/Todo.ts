import { User } from './User';

export interface ToDo {
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
