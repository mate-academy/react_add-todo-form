//.. TodoType для масива постів тодос
import { UsersType } from './UsersType';

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UsersType;
}
