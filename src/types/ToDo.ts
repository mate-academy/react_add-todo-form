import { User } from './User';

export type ToDo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};
