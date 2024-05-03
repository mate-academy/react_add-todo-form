import { User } from './UserType';

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}
