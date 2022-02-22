import { User } from './User';

export interface PreparedTodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
