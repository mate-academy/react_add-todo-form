import { Todo } from '../types/Todo';
import { getUserById } from './userUtils';
import todosFromServer from '../api/todos';

export const todosUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
