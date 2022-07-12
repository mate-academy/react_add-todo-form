import User from './User';

export default interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
