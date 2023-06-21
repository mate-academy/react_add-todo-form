import { Todo } from '../Types/Todo';

export function getNewTodoId(currentTodos: Todo[]) {
  return Math.max(...currentTodos.map((todo) => todo.id)) + 1;
}
