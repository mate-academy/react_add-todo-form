import users from '../api/users';
import { User } from '../types/User';

export type UserId = number;

export function getUserById(id: UserId): User | null {
  return users.find(user => user.id === id) || null;
}
