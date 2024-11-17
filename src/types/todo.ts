import { User } from './user';

export type TODO = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
