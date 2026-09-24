import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User {
  const userFound: User | undefined = usersFromServer.find(
    user => user.id === userId,
  );

  if (!userFound) {
    throw new Error(`user with id ${userId} not found!`);
  }

  return userFound;
}
