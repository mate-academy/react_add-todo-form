import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}
