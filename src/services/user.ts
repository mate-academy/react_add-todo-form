import { User } from '../components/Types/interfaces';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
