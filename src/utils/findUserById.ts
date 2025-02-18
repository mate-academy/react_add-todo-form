import { User } from '../types';

export function findUserById(users: User[], userId: number) {
  return users.find(user => user.id === userId) ?? null;
}
