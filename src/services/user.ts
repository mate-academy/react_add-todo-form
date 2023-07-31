import { User } from '../types/User';

export function findUserById(userId: number, users: User[]) {
  return users.find(user => user.id === userId) || null;
}
