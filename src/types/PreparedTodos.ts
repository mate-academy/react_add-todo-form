import { Users } from './Users';

export interface PreparedTodos {
  user: Users | null;
  id: number;
  title: string;
  completed: boolean;
}
