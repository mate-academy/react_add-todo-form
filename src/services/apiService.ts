import { PreparedTodo, User } from '../types';

import todosFromServer from '../api/todos';
import usersFromServer from '../api/users';

export function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getPreparedTodos(): PreparedTodo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
}

export function getUsers(): User[] {
  return usersFromServer;
}
