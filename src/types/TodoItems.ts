import { User } from '../types/User';

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
