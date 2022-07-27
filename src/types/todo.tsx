import { User } from './user';

export interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}
