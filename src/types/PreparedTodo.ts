import { User } from './User';

export interface PreparedTodo {
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}
