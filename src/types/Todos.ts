import { Users } from './Users';

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  user?: Users | null;
}
