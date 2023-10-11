import { Todo } from '../types/Todo';

export const getLargestId = (elements: Todo[]) => {
  if (!elements.length) {
    return 0;
  }

  const ids = elements.map(element => element.id);

  return Math.max(...ids);
};
