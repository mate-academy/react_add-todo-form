import { Todo } from '../types/Todo';

export function getNewTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
