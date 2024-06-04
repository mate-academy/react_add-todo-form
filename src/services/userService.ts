import usersFromServer from '../api/users';
import { UserProps } from '../types/UserProps';

export function getUserById(userId: number): UserProps | undefined {
  return usersFromServer.find(user => user.id === userId);
}
