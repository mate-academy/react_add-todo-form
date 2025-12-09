import { Users } from './Users';

export interface Todos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: Users | null;
}
