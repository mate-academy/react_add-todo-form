import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User | null {
  const currentUser = usersFromServer.find(user => user.id === userId);

  return currentUser || null;
}
