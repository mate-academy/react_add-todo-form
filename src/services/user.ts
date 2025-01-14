import usersFromServer from '../api/users';
import { User } from '../components/types/User';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) as User;
}
