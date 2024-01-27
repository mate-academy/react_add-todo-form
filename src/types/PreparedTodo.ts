import { User } from './User';

export interface PreparedTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
