import { User } from '../User';

export interface PreparedTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
