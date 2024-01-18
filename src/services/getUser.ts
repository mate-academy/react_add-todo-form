import { User } from '../types/User';

export function getUserById(userId: number, users: User[]): User {
  return users.find(user => user.id === userId) as User;
}
