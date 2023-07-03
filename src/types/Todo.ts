import { UserInterface } from './User';

export interface TodoInterface {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
  user: UserInterface | null,
}
