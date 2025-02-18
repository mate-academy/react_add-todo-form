import { User } from './User';

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
export interface ToDoWithUser extends ToDo {
  user: User | null | undefined;
}
