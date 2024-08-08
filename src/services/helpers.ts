import usersFromServer from '../api/users';
import { PreparedTodo, User } from './types';
const users: User[] = usersFromServer;

export const userSearcher = (userId: number): User | undefined => {
  return users.find(user => user.id === userId);
};

export const generateId = (array: PreparedTodo[]): number => {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map(todo => todo.id));

  return maxId + 1;
};
