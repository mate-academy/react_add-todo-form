import { User } from '../types';

export function getUserById(users: User[], id: number) {
  return users.find(user => user.id === id);
}
