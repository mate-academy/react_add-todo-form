import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === +userId);

  return foundUser || null;
}
