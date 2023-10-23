import { User } from './User';

export interface FullTodo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
}
