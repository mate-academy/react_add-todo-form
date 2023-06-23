import { User, Todo } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const preparedTodo = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const getNewId = (todos: Todo[]) => {
  const ids = todos.map(item => item.id);
  const maxId = Math.max(...ids);

  return (
    Number.isFinite(maxId)
      ? maxId + 1
      : 1
  );
};
