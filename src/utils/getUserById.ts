import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(id: number) {
  return usersFromServer.find((user: User) => user.id === id) as User;
}
