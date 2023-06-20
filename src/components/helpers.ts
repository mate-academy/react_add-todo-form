import { Todo } from '../types/Todo';
import { User } from '../types/User';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): User | null => {
  const findUser = usersFromServer.find((user) => (user.id === userId));

  return findUser || null;
};

export const getTodoId = (listTodos: Todo[]): number => {
  const todosId = listTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
};
