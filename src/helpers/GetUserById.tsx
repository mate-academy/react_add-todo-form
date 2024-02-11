import users from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number): User | null => {
  const result = users.find(user => user.id === userId);

  return result || null;
};
