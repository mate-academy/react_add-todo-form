import { User } from '../../Types/User';

export function getUserById(id: number, users: User[]): User | null {
  return users.find(user => user.id === id) || null;
}
