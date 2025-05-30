import { User } from '../User';

export function getUserById(users: User[], userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}
