import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';

export const getNextId = (arr: Todo[]) => {
  return Math.max(...arr.map(item => item.id)) + 1;
};

export const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);
