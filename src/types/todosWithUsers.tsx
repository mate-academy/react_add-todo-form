import { User } from './user';

export type TodosWithUsers = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};
