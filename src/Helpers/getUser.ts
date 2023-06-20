import { User } from '../Types/User';

export function getUser(userId: number, users: User[]): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}
