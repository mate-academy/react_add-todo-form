import { User } from './User';

export type ToDo = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};