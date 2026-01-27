import { User } from './User';

export type Task = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};
