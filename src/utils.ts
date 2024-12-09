import { User, Todo } from './types';
import usersFromServer from './api/users';

export const getUserById = (userId: number): User | null =>
  usersFromServer.find(person => person.id === userId) || null;

export const getNewTodoId = (items: Todo[]): number => {
  const maxId = Math.max(...items.map(item => item.id));

  return maxId + 1;
};
