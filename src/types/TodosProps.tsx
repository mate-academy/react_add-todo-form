import { User } from './UserType';

export type Todo = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
