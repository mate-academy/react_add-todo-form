import { User } from './types/User';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User,
}

interface ExtendedTodo extends Todo {
  user: User,
}
