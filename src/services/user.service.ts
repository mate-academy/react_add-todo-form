import usersFromServer from '../api/users';
import { User } from '../types/user';

export function getUser(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}
