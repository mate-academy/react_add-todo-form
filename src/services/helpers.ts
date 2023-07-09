import usersFromServer from '../api/users';
import { Todo } from './todo';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export function getNewTodoId(todos: Todo[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
