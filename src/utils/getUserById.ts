import { User } from '../types/User';

export const getUserById = (userId: number, users: User[]) =>
  users.find(user => user.id === userId);
