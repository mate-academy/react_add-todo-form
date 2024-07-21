import usersFromServer from '../api/users';
import { Todo } from './types';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getMaxTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}
