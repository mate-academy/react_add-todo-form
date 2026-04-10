import { User } from '../types/User';

export function assignUserToObject<T extends { userId: number }>(
  object: T,
  users: User[],
): T & { user: User | null } {
  return {
    ...object,
    user: users.find(user => user.id === object.userId) || null,
  };
}
