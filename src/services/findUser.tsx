import usersFromServer from '../api/users';
import { User } from '../types/user';

export const findUser = (userId: number): User | undefined => {
  return usersFromServer.find(el => el.id === userId);
};
