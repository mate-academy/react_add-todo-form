import { User } from './types/user';
import usersFromServer from './api/users';

export const getUserById = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};
