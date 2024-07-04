import { User } from './User.model';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface UserTodo extends Todo {
  user?: User;
}
