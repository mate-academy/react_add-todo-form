import { User } from './user';

export type Todo = {
  user: User | null,
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};
