import { UserType } from './UserType';

export type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UserType | null;
};
