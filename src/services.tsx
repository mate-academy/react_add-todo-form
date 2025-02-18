import { User } from './types';
import usersFromServer from './api/users';
import todos from './api/todos';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function generateId() {
  const maxValue = Math.max(...todos.map(todo => todo.id));

  return maxValue + 1;
}
