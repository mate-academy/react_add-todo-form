import { User } from '../types/User';
import usersFromServer from '../api/users';

export function findUserById(id: number): User {
  return usersFromServer.find(user => user.id === id)!;
}
