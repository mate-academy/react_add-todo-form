import { User } from './User';

export interface Todos {
  person: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId?: number | null;
}
