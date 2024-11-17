import { TODO } from '../types/todo';
import todosFromServer from '../api/todos';
import { getUserById } from './userById';

export const initialTodos: TODO[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
