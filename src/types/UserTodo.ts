import { USER } from './UserType';

export type USERTODO = {
  id: number;
  title: string;
  completed: boolean;
  user: USER;
};
