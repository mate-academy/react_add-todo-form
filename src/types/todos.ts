import { Users } from './users';

export type Todos = {
  user: Users;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
