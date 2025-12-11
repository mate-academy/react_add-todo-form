import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: false | boolean;
  user: User;
};
