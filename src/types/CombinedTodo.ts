import { User } from './User';

export interface CombinedTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
}
