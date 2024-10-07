import { User } from '../Types/user';
import usersFromServer from './../api/users';

export const findUserByUserId = (userId: number): User | null => {
  return usersFromServer.find((user: User) => user.id === userId) || null;
};
