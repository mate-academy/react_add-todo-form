import { User } from './User';

export type TodoUser = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
};
