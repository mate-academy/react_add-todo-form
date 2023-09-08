import { TodoWithUser } from '../types';

export function generateUniqueId(todos: TodoWithUser[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
