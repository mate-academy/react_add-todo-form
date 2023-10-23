import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getNewTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}
