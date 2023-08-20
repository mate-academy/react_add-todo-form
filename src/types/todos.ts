import { Users } from './users';

export interface Todos {
  id: number,
  title: string,
  completed?: boolean,
  userId: number,
  user: Users | null,
}
