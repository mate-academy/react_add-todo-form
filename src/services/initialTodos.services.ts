import { Todos } from '../types/todos';
import { getUser } from './user.service';
import todosFromServer from '../api/todos';

export const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
