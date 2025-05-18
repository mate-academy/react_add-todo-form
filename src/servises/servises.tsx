import { Todo, User } from '../types/types';
import usersFromServer from '../api/users';

export const getUserById = (userId: Todo['userId']): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
