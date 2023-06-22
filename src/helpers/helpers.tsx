import usersFromServer from '../api/users';
import { Todo } from '../types';

export const getUserById = (userId: number) => {
  const foundedUser = usersFromServer.find(user => (
    userId === user.id
  ));

  return foundedUser || null;
};

export const getNewTodoId = (todos: Todo[]) => {
  const maxId = (todos.map((todo) => (todo.id)));

  return Math.max(...maxId) + 1;
};
