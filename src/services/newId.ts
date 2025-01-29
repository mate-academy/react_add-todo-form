import { Todo } from '../types/Todo';

export function newIdTodo(todos: Todo[]) {
  const arrayId = todos.map(todo => todo.id);

  return Math.max(...arrayId) + 1;
}
