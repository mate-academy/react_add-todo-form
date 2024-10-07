import User from './User';

interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export default ToDo;
