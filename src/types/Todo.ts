import { User } from './User';

export interface TodoWithoutUser {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface TodoWithUser {
  id: number,
  title: string,
  completed:boolean,
  userId: number,
  user: User | null,
}
