import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

export const findUserById = (userId: number): User | null => (
  usersFromServer.find((user) => user.id === userId) || null
);

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const newTodoId: number = Math.max(
  ...todosFromServer.map(todo => todo.id),
) + 1;
