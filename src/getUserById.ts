import { User } from './types/User';

export const getUserById = (userId: number, users: User[]) => {
  return users.find(user => user.id === userId) || null;
};
