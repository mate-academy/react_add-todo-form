import { Todo } from '../types/todo';

export function getMaxTodoId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0) + 1;
}
