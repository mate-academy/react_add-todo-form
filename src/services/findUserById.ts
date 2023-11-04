import usersFromServer from '../api/users';
import { User } from '../types/user';

export const findUserById = (id: number): User => {
  return usersFromServer.find(user => user.id === id) as User;
};
