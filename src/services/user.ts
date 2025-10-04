import { User } from '../types/User';

export const getUserById = (userId: number, users: User[]): User | null => {
  return users.find(user => user.id === userId) || null;
};
