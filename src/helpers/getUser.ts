import { User } from '../types/user';

export function getUser(users: User[], name: string) {
  return users.find(user => user.name === name) || null;
}
