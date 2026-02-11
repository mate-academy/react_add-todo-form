import { User } from './../types/User';

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
}
