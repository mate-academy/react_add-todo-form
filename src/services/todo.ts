import { Todo } from '../types/todo';

export function getNewTodosId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
