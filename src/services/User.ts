import { User } from '../newType/User';
import usersFromServer from '../api/users';

export function getUserId(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
