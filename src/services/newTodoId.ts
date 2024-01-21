import { Todo } from '../types/Todo';

export function newTodoId(todos: Todo[]) {
  return todos.reduce((maxId, todo) => (
    todo.id > maxId
      ? todo.id
      : maxId
  ), 0) + 1;
}
