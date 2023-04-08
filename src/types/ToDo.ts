import { User } from './User';

export interface ToDo {
  completed: boolean;
  id: number;
  title: string;
  userId: number | undefined;
  user: User | undefined;
}
