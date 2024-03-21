import { User } from '../types/User';
import usersFromServer from '../api/users';

export function findUser(userId: number): User {
  return usersFromServer.filter(user => user.id === userId)[0];
}
