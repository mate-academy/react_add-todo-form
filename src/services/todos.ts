import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './user';

export const filteredTodos = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }))
  .filter(todo => todo.user?.id);

export function getMaxId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId > 0 ? maxId : 0;
}
