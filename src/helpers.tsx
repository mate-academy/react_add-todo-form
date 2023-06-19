import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

export const prepareTodo = (userName: string, title: string) => {
  const userToAddToDo = usersFromServer
    .find(user => user.name === userName);
  const freeId = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

  if (!userToAddToDo) {
    throw new Error('No user found');
  }

  return {
    id: freeId,
    title,
    completed: false,
    userId: userToAddToDo.id,
  };
};
