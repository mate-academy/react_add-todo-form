import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number) => {
  return usersFromServer.find((el: User) => el.id === userId);
};
