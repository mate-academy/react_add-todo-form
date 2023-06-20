import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};
