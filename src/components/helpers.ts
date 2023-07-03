import { TodoInterface } from '../types/Todo';
import { UserInterface } from '../types/User';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): UserInterface | null => {
  const findUser = usersFromServer.find((user) => (user.id === userId));

  return findUser || null;
};

export const getTodoId = (listTodos: TodoInterface[]): number => {
  const todosId = listTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
};
