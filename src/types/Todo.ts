import { IUser } from './User';

export interface TodoEntity {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: IUser | null
}
