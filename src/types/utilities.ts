import { User } from './types';

export const getUserByName = (arr: User[], id: number) => {
  return arr.find(user => user.id === id)?.name || null;
};

export const getUsersEmailById = (arr: User[], id: number) => {
  return arr.find(user => user.id === id)?.email;
};
