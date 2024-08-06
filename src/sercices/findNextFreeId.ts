import { Unique } from '../types';

export function findNextFreeId<T extends Unique>(items: T[]): number {
  const maxId = Math.max(...items.map(item => item.id));

  return maxId + 1;
}
