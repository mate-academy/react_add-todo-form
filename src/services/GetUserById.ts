import userFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User {
  return userFromServer.find(user => user.id === userId) || null;
}
