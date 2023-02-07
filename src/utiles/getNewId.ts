import { Todo } from '../types/Todo';

export const getNewId = (items:Todo[]):number => {
  const maxId = Math.max(...items.map(todo => todo.id));

  return maxId + 1;
};
