import { User } from '../../Types/User';

export function GetUserById(id: number, users: User[]): User | null {
  return users.find(user => user.id === id) || null;
}
