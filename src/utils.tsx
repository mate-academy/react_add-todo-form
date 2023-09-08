import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export function getNewTodoId(todos: Todo[]) {
  const maxId = todos.length > 0
    ? Math.max(...todos.map(todo => todo.id))
    : 0;

  return maxId + 1;
}
