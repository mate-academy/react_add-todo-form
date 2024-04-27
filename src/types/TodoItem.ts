import { UserInfo } from './user';

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: UserInfo;
};
