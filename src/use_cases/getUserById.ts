import { User } from '../types';

export function getUserById(users: User[], userId: number) {
  return users.find(user => user.id === userId) || null;
}
