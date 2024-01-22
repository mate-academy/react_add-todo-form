import { TodoWUser } from '../types/TodoWUser';

export function getMaxTodoId(todos: TodoWUser[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0);
}
