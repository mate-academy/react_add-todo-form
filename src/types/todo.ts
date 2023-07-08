import { User } from './user';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
  user: User,
};
