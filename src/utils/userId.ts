import { User } from '../type.ts/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
