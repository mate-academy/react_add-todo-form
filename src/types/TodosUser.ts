import { User } from './User';

export interface TodoUser {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User
}
