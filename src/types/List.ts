import { User } from './User';

export interface List{
  person: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId?: number | null;
}
