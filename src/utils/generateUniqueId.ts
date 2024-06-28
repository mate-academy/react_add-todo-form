import { Todo } from '../types/Todo';

export function getNewTodoId(todosList: Todo[]) {
  const maxId = Math.max(...todosList.map(t => t.id));

  return maxId + 1;
}
