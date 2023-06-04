import { User } from '../types/User';

export function getUser(id:number, array: User[]): User | null {
  const foundUser = array.find(user => user.id === id);

  return foundUser || null;
}
