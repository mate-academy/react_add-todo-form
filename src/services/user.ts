import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function checkUser(user: User | null) : string {
  if (user !== null) {
    return `${user}`;
  }

  return '';
}
