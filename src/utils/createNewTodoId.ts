import { Todo } from '../types';

export function createNewTodoId(todos: Todo[]) {
  return Math.max(...todos.map(({ id }) => id)) + 1;
}
