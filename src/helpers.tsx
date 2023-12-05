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
  const requiredUser = usersFromServer.find(user => (
    user.id === userId
  ));

  return requiredUser;
};

export const preparedTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));
