import { User } from './User';

export type UsersList = {
  userId: number,
  id: number,
  title: string,
  completed?: boolean | null | undefined,
  user?: User | undefined;
};
