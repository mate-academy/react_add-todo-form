import { User } from '../types/user';
import users from '../api/users';

export const getUserById = (userId: number): User | null => (
  users.find((user) => user.id === userId) || null
);

export const getUserByName = (userName: string): User | null => (
  users.find((user) => user.name === userName) || null
);
