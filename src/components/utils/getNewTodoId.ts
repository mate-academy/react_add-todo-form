import { TodoWithUser } from '../../types/TodoWithUser';

export function getNewTodoId(todos: TodoWithUser[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
