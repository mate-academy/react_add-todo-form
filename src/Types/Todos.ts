import { User } from './User';

export interface Todos {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
