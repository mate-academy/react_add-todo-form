import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(id: number): User | null {
  return usersFromServer.find(user => user.id === id)
    || null;
}
