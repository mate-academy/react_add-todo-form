import { User } from './User';

export interface TodoInterface {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
