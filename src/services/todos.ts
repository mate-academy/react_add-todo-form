import todosFromServer from '../api/todos';
import { Todos } from '../types/Todos';
import { getUserById } from './users';

export const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
