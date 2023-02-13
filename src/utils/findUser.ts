import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

import { User } from '../types/User';

export function findUser(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId) || null;
}

export const todos = todosFromServer.map((todo) => ({
  ...todo,
  user: findUser(todo.userId),
}));
