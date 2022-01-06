import { User } from './User';

export interface Todo {
  userId: number | undefined,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null,
}
