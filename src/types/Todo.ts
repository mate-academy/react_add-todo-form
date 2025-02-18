import { User } from './User';

export type TodoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
