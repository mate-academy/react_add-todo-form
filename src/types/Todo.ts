import { User } from './User';

export interface Todo {
  user: User | null;
  completed: boolean;
  id: number;
  userId: number;
  title: string;
 
}
