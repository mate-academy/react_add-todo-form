import { User } from './User';

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
