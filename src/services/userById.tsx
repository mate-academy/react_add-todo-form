import usersFromServer from './../api/users';
import { User } from '../interfaces';

export const userById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
}
