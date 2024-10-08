import usersFromServer from '../api/users';
import { User } from '../types/User';

export const findUserById = (id: number): User => {
  return usersFromServer.find(user => user.id === id)!;
};
