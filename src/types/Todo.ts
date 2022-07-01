import { User } from './User';

export type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

export type UserWithTask = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null;
};
