import { Todo } from '../types/todo';

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));
  // return +Math.random().toFixed(12).slice(2);

  return maxId + 1;
}
