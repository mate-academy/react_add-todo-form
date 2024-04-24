import { User } from './user';

export type TodoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
