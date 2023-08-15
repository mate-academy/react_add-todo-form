import todosFromServer from '../api/todos';
import { getUserById } from './getUserById';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));
