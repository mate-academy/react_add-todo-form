import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

export const getNewTodoId = (todos: Todo[]) => {
  const todoIds = todos.map(todo => todo.id);
  const maxId = Math.max(...todoIds);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};

export const getUserById = (users: User[], userId: number): User | null => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};
