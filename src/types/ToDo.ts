import { User } from './User';

export interface ToDo {
  user?: User;

  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
