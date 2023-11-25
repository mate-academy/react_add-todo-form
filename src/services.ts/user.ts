import usersFromServer from '../api/users';
import { User } from '../types/TypeUser';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}
