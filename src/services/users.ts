import { User } from '../types/user';

export const getUserById = (users: User[], userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};
