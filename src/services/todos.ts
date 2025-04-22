import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './users';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
