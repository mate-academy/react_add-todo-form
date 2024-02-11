import { Todo } from '../types/Todo';

export const getNewTodoId = (array: Todo[]) => {
  const maxId = Math.max(...array.map(item => item.id));

  return maxId + 1;
};
