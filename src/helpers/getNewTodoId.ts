import { Todo } from '../types/Todo';

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(({ id }) => id));

  return maxId + 1;
}
