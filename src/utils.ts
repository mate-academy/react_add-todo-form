import { User } from './types/User';

export function findUserById(id: number, usersFromServer: User[]): User | null {
  return usersFromServer.find(user => user.id === id) ?? null;
}
