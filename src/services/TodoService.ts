import { Todo } from '../types/Todo';

export function getNextId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
