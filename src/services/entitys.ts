import { EntityItem } from '../types/Entity';

export const getItemById = <T extends EntityItem>(
  id: number,
  entity: T[],
): T | null => {
  return entity.find(user => user.id === id) || null;
};

export const generateNextIdFor = <T extends EntityItem>(
  entity: T[],
): number => {
  return Math.max(...entity.map(todo => todo.id)) + 1;
};
