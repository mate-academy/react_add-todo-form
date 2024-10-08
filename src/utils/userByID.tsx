import { User } from '../types/types';
import usersFromServer from '../api/users';

export function userById(id: number): User {
  return usersFromServer.find(user => user.id === id)!;
}
