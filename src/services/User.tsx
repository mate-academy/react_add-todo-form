import { User } from '../types/User';

export function getUserById(users: User[], userId: number) {
  return users.find(user => user.id === userId) || null;
}
