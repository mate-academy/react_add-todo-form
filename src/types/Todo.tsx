import { User } from './User';

export interface Todo {
  user: User | null,
  userId: number,
  id: number,
  title: string,
  completed : boolean,
}
