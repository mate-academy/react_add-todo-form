import usersFromServer from '../../api/users';
import { User } from '../../types/User';

export function findUserById(userId: number): User | null {
  return usersFromServer.find(({ id }) => id === userId) || null;
}
