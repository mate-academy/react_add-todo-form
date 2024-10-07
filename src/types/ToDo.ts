import User from './User';

export default interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
