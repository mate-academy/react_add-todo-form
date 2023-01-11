import { User } from './User';

export interface Todos {
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
  userId: number;
}
