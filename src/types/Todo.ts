import User from './User';

export default interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
