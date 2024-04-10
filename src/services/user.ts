import { User } from '../types';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
