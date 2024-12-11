import { IUser } from './IUser';

export interface ITodoListItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: IUser | null;
}
