import { User } from './userType';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
}
