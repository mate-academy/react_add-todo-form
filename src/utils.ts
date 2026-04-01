import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types';

const usersIdMap = new Map<number, User>();

usersFromServer.forEach(user => {
  usersIdMap.set(user.id, user);
});

export const getUserById = (id: number): User | undefined => {
  return usersIdMap.get(id);
};

export const getMaxTodoIdFromServer = () => {
  const todoIds = todosFromServer.map(todo => todo.id);

  return Math.max(...todoIds);
};
