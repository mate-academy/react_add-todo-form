import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User {
  return usersFromServer.find(user => user.id === userId)
    || null;
}
