import { User } from '../types';

export function findUserById(users: User[], id: number) {
  return users.find(user => user.id === id) || null;
}
