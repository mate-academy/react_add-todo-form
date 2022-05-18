import { Users } from './User';

export interface Todos {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: Users,
}
