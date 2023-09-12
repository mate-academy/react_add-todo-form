import { User } from '../types';

export function findUserById(users: User[], userId: number): User | undefined {
  return users.find(({ id }) => id === userId);
}
