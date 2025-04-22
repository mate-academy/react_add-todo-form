import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: User['id']): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const users = usersFromServer;
