import { User } from '../types/User';
import usersFromServer from '../api/users';

export function getAllUsers(): User[] {
  return usersFromServer;
}

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
