import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}
