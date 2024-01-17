import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number) => {
  return usersFromServer.find((u) => u.id === userId) as User;
};
