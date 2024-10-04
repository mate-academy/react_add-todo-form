import usersFromServer from '../api/users';
import { type User } from '../types/types';

export const getUserById = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};
