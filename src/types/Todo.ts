import { ValidUser } from '../App';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: ValidUser;
}
