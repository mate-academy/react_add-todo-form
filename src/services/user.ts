import usersFromServer from '.././api/users';
import { User } from '../types/User';

export function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId);
}
