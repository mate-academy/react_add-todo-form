import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export function getTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
