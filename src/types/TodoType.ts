import { UserType } from './UserType';

export interface TodoType {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: UserType | null,
}
