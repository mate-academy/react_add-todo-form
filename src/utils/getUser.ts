import { User } from '../types/User';

export function getUser(users: User[], userId: number): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}
