import { Todo } from '../types';

export function getNextFreeId(todos: Todo[]): number {
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

  return maxId + 1;
}
