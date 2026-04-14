import { User } from '../components/UserInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
