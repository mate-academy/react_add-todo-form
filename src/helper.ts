import { Todo } from './types/Todo';

export function getNewId(todos: Todo[]) {
  const todoIds = todos.map(todo => todo.id);
  const maxId = Math.max(...todoIds);

  return maxId + 1;
}
