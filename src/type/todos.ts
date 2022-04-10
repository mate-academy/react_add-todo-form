import { User } from './user';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  user?: User,
}
