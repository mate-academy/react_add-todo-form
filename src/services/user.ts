import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(el => el.id === userId) || null;
}
