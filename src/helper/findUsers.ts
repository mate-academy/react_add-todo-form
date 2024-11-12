import users from '../api/users';
import { User } from '../types/Types';

export const findUserById = (userId: number): User | null => {
  return users.find((user: User) => user.id === userId) || null;
};
