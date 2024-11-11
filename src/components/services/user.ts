import users from '../../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}
