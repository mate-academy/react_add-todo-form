import { Todo } from '../types/Todo';

export function getNewId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
