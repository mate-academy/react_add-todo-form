import { User } from '../types/types';
import usersFromServer from '../api/users';

export function getUser(userId: number): User | undefined {
  return usersFromServer.find(el => el.id === userId);
}
