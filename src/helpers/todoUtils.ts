import { Todo } from '../types/Todo';
import { getUser } from './userUtils';
import todosFromServer from '../api/todos';

export const todosUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
