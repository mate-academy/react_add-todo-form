import usersFromServer from '../api/users';
import { User } from '../types/User';

export type UserId = number;

export function getUserById(id: UserId): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}
