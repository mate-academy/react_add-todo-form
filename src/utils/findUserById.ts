import { User } from '../types';

export function findUserById(users: User[], userId: number) {
  return users.find(({ id }) => userId === id) || null;
}
