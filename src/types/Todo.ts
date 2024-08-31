import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type TodoWithUser = Todo & {
  user: User | undefined;
};
