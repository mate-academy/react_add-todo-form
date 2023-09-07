import { IUser } from './User';

export interface ITodo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: IUser | null
}
