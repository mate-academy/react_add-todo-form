import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getPreparedUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
