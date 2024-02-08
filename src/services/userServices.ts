import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserById(userID: number): User | null {
  const person = (usersFromServer.find((user) => user.id === userID)) || null;

  return person;
}
