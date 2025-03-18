import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find((user: User) => user.id === userId) || null;
};
