import { Todo } from '../components/Types/interfaces';
import todosFromServer from '../api/todos';
import { getUserById } from './user';

export const getDefaultTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
