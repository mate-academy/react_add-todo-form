import { User } from './User';

export interface ToDoWithoutUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ToDoWithUser extends ToDoWithoutUser{
  user: User | null;
}
