import { User } from './User';

export type Todos = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null,
};
