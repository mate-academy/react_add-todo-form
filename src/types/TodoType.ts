import { UserType } from './UserType';

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UserType | null;
};
