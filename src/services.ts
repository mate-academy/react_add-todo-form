import usersFromServer from './api/users';
import { Todo, User } from './types';

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export const getNewTodoId = (todoList: Todo[]) => {
  return Math.max(...todoList.map(todo => todo.id)) + 1;
};
