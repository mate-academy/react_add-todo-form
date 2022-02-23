import { User } from './User';

export type Todo = {
  id: number,
  userId: number | undefined,
  title: string,
  completed: boolean,
  user: User | null,
};
