import { User } from './User';

export interface ToDo {
  user: User | undefined;

  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
