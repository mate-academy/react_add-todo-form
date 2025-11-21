import { User } from '../api/types';
import usersFromServer from '../api/users';

export function getUsersById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
