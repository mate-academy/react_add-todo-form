import { User } from './user';

export type ToDo = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
