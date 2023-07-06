import { IUser } from './user';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ITodoWithUser extends ITodo {
  user?: IUser;
}
