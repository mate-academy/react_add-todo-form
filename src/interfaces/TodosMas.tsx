import { UserMas } from './UserMas';

export interface TodosMas {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: UserMas;
}
