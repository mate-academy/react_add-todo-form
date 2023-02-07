import { User } from './User';

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export type FullTodo = Todo & {
  user: User | null,
};
