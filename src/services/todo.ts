import { Todo } from '../types/todo';
import usersFromServer from '../api/users';

export function getNewTodosId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}
