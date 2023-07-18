import { Todo } from '../types/Todo';

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(post => post.id));

  return maxId + 1;
}
