import { User } from '../types/user';

export function getUser(users: User[], id: number) : User | null {
  return users.find(user => user.id === id) || null;
}
