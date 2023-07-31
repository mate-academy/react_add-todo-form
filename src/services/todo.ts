import { Todo } from '../types/Todo';

export function generateTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
