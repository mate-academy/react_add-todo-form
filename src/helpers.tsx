import { Todo } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getMaxId = (todos: Todo[]) => {
  if (!todos.length) {
    return 1;
  }

  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};

export const getUser = (userId: number) => {
  return usersFromServer.find(({ id }) => id === userId);
};

export const preparedTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
