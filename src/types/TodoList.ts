import { User } from './User';

export interface TodosList {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}
