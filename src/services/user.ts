import { User } from '../components/types/User';
import usersFromServer from '../api/users';

export function getUserByid(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
