import { Todo } from './types/Todo';
import usersFromServer from './api/users';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
