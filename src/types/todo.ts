import { User } from './user';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type TodoWithUserInfo = Todo & {
  user: User;
};
