import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};
