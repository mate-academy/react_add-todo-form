import todosFromServer from '../api/todos';
import { Todo } from '../types/todo';
import { getUserById } from './getUserById';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
