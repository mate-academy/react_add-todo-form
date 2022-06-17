import { User } from './User';

export interface ToDo {
  userId?: number,
  user?: User,
  id: number,
  title: string,
  completed: boolean,
}
