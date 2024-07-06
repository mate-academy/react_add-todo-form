import { User } from './User';

export type ToDoUser = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
