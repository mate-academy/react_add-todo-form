import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

export const todoList: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return { ...todo, user };
});
