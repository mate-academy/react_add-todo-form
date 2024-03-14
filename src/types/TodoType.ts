import { UserType } from './UserType';

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UserType | null;
}
