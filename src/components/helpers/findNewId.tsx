import { TodoWithUser } from '../../Types/TodoWithUser';

export function findNewId(todos: TodoWithUser[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
