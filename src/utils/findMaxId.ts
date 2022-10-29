import { TodoFromServer } from '../types/TodoFromServer';

export function findMaxId(todos: TodoFromServer[]): number {
  let maxTodoId = 0;

  for (let i = 1; i < todos.length; i += 1) {
    maxTodoId = Math.max(todos[i].id, todos[i - 1].id);
  }

  return maxTodoId;
}
