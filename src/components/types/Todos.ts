import { User } from './User';

export interface Todos {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
