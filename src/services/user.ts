import usersFromServer from '../api/users';
import { User } from '../types/user';

export function getUserById(userId: number): User {
  const user = usersFromServer.find(u => u.id === userId);

  if (!user) {
    throw new Error(`User with id ${userId}`);
  }

  return user;
}
