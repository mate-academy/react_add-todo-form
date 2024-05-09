import { IUser } from './User.types';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: IUser | null;
}

export type ToDoWithoutUser = Omit<ITodo, 'user'>;
