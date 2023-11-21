import { IUser } from './user';

export interface ITodo {
  id: number,
  title: string,
  userId: number,
  completed: boolean
  user?: IUser,
}
