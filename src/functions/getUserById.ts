import usersFromServer from '../api/users';
import { User } from '../types/user';

export function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId);
}
