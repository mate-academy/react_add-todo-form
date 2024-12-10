import { User } from './User';

export interface TodosWithUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
