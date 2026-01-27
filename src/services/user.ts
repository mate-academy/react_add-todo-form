import usersFromServer from '../api/users';
import { User } from '../types/user';

export function getUserById(userId: number): User {
  const users = usersFromServer.find(user => user.id === userId);

  if (!users) {
    throw new Error(`User with id ${userId}`);
  }

  return users;
}
