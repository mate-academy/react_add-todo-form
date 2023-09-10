import User from './User';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};

export default Todo;
