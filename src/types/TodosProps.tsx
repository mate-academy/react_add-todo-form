import { User } from './TypeUser';

export type Todos = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
