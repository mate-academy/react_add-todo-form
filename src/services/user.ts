import usersFromServer from '../api/users';
import { User } from '../interfaces';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
