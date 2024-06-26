import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { Todo } from '../../types';

export function getUserById(todoUserId: number) {
  return usersFromServer.find(user => todoUserId === user.id);
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));
