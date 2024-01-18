import { Todo } from '../types/Todo';

export function newTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
