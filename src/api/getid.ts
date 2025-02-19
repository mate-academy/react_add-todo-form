import { Todo } from '../types';

export const getMaxId = (list: Todo[]) => {
  return list.length ? Math.max(...list.map(a => a.id)) : 0;
};
