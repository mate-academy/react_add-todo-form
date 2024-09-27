import { Todo } from '../types/Todo';

export function getAvailableTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
