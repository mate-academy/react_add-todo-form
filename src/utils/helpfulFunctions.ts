import { Todo } from '../types/Todo';

export function getLatestTodoId(arr: Todo[]): number {
  const ids: number[] = arr.map(todo => todo.id);

  return Math.max(...ids);
}
