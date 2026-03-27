import { User } from '../components/Types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}
