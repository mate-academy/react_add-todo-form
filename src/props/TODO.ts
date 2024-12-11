import { User } from './User';

export type ToDo = {
  user?: User;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
