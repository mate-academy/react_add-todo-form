import userFromServer from './api/users';
import { User } from './types';

export const getUserById = (id: number): User | null => {
  return userFromServer.find(user => user.id === id) || null;
};
