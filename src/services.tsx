import { User } from './type/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export const getTodoId = () =>
  Math.max(...todosFromServer.map(todo => todo.id)) + 1;
