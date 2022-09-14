import { User } from './User';

export interface UserWithTodo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
