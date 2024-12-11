import { Todo } from '../types';

export function createNewId(todos: Todo[]) {
  const maxId = todos.reduce((acc: number, todo: Todo) => {
    return Math.max(todo.id, acc);
  }, 0);

  return maxId + 1;
}
