import { User } from './User';

export interface ToDoListWithUser {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User | null;
}
