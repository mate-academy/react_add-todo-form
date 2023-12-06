import usersFromServer from '../api/users';
import { User } from '../types/user';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) as User;
}
