import { User } from './User';

export interface TodoWithUser {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
