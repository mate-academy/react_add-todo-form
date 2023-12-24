import { User } from './Users';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User,
}
