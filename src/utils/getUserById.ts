import { User, Users } from '../types/User';

export const getUserById = (id: number, users: Users): User | null => users
  .find(user => user.id === id) || null;
