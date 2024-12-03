import usersFromServer from '../api/users';
import { User } from '../Types/userInterface';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
