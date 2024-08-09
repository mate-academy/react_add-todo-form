import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo, User } from './types';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
