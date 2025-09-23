import { User } from './User';
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  user?: User;
};
