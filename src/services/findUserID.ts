import userFromServer from '../api/users';
import { User } from '../type/User';

export function findUserID(userId: number): User | undefined {
  return userFromServer.find(user => user.id === userId) || undefined;
}
