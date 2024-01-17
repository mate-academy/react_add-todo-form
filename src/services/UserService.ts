import { User } from '../types/User';

export function getUserById(userId: number, users: User[]): User | null {
  return users.find(user => user.id === userId) || null;
}
