import { Users } from './users';

export type Todos = {
  user: Users | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
