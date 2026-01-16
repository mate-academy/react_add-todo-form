import { Todo } from '../types';

export function getMaxTodoId(todos: Todo[]) {
  if (!todos.length) {
    return 0;
  }

  return Math.max(...todos.map(todo => todo.id));
}
