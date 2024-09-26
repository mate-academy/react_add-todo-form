import { User } from './User';

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};
