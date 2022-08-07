import { User } from './User';

interface Todo {
  userId: number | null,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

export default Todo;
