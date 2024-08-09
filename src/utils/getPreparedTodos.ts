import { TodoExtended } from '../types/TodoExtended';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { findUserById } from './findUserById';

export const getPreparedTodos = (): TodoExtended[] => {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: findUserById(usersFromServer, todo.userId),
    };
  });
};
