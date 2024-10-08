import { User } from '../types/User';
import usersFromServer from './../api/users';

export const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find(user => user.id === userId);
};
