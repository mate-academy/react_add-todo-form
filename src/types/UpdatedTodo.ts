import { User } from './User';
export interface UpdatedTodo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}