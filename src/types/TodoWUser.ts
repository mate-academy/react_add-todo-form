import { User } from './User';

export type TodoWUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | undefined;
};
