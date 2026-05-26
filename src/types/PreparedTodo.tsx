import { User } from './User';

export type PreparedTodo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
};
