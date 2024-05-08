import { User } from '../interfaces/User';

export const getUserById = (users: User[], id: number): User | null => {
  return users.find(user => user.id === id) || null;
};
