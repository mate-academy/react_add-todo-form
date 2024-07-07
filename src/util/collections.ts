import { CollectionItem } from '../types/Collection';

export const getItemById = <T extends CollectionItem>(
  id: number,
  collection: T[],
): T | null => {
  return collection.find(user => user.id === id) || null;
};

export const generateNextIdFor = <T extends CollectionItem>(
  collection: T[],
): number => {
  return Math.max(...collection.map(todo => todo.id)) + 1;
};
