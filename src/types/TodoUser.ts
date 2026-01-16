import { User } from './User';

export type TodoUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
