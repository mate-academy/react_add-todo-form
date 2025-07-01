import { User } from '../types/User';

export function findUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}
