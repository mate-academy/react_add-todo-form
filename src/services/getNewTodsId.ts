import { Todos } from '../types/Todo';

export function getNewTodsId(todos: Todos[]) {
  const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

  return maxId + 1;
}
