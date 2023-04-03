import { User } from './User';

export interface Todo {
  id: number,
  title: string,
  userId: number,
  user: User,
  completed: boolean
}
