import { Todo } from '../types';

export function getMaxTodoId(list: Todo[]) {
  const listOfId = list.map(item => item.id);

  return Math.max(...listOfId);
}
