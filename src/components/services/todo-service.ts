import { Todo } from '../types/Todo';

export function getNewTodoId(posts: Todo[]): number {
  const maxId = Math.max(...posts.map(todo => todo.id));

  return maxId + 1;
}
