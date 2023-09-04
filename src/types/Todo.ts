import { User } from './User';

export type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user?: User | null,
};
