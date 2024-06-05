import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) as User;
}
