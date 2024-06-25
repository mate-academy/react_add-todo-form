import { User } from './User';

export type TodoCard = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
