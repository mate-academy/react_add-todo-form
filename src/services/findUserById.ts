import usersFromServer from '../api/users';
import { User } from '../types/user';

export const findUserById = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};
