import { User, Users } from '../types/User';

export const getUserById = (id: number, users: Users): User | undefined => users
  .find(user => user.id === id);
