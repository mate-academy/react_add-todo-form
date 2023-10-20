import { User } from './User';

export type PreparedTodo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};
