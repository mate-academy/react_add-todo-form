import { User } from '../components/types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): User {
  return usersFromServer.find(user => user.id === userId) as User;
}
