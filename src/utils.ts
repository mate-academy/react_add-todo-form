import { Todo, User } from './types';

export const getUserByID = (users: User[], userId: number) => {
  return users.find(user => user.id === userId);
};

export const getNewTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
