import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const getNewId = (arr: { id: number }[]): number => {
  const ids = arr.map((item) => item.id);
  const maxId = Math.max(...ids);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};
