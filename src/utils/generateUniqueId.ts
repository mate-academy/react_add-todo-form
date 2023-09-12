import { TodoWithUser } from '../types';

export function generateUniqueId(todos: TodoWithUser[]): number {
  return Math.max(...todos.map(({ id }) => id)) + 1;
}
