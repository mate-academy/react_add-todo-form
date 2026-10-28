import { UsersType } from './UsersType';

export type ToDosType = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UsersType | undefined;
};
