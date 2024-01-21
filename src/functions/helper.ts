import { User } from '../types/User';
import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) as User;
}

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}
