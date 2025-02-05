import { User } from './USER';

export type Todo = {
  id: number;
  title: string;
  completed?: boolean;
  userId: number;
  user: User | null;
};
