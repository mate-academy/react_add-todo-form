import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './user';

export function getPreparedTodos() {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

export function getMaxId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id), 0);
}
