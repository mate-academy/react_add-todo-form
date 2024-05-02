import usersFromServer from '../api/users';
import { User } from '../types';

type GetUserById = (userId: number) => User | undefined;

export const getUserById: GetUserById = userId => {
  return usersFromServer.find(user => user.id === userId);
};
