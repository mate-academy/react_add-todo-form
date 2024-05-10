import { UsersProps } from './User';

export interface TodosProps {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UsersProps | null;
}
