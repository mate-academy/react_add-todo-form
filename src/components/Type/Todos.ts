import User from './User';

export interface Todos {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null
}
