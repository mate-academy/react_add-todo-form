import { User } from './User';

export interface TodosWithUsers {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}
