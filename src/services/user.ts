import usersFromServer from '../api/users';
import { User } from '../types/User';

export const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);
