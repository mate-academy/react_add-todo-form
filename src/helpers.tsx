import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUser = (userId: number): User => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  if (!foundUser) {
    throw new Error('User was not found');
  }

  return foundUser;
};

export const prepareTodo = (username: string, title: string) => {
  const foundUser = usersFromServer
    .find(user => user.name === username);
  const id = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

  if (!foundUser) {
    throw new Error('User was not found');
  }

  return {
    id,
    title,
    completed: false,
    userId: foundUser.id,
  };
};
