import { User } from '../types/User';
import users from '../api/users';

export function getUsersById(userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}
