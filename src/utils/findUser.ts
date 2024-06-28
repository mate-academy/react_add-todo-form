import usersFromServer from '../api/users';
import { User } from '../types';
export function findUser(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}
