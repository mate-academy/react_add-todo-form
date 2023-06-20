import { User } from '../Types/User';

export function getUserById(userId: number, users: User[]): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}
