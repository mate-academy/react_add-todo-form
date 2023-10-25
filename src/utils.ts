import usersFromServer from './api/users';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const getUserById = (id: number): User => {
  return <User>usersFromServer.find((user) => user.id === id);
};

export const getNextTodoID = (todos: Todo[]): number => {
  const maxID = todos.reduce((acc, todo) => {
    return acc > todo.id ? acc : todo.id;
  }, 0);

  return maxID + 1;
};
