import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export const getMaxId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

export const getUserById = (userId: number) => {
  return usersFromServer.find(({ id }) => id === userId) || null;
};

export const getValidTitle = (title: string) => {
  const regex = /[a-zA-Zа-яА-Я0-9\s]/g;
  const validTitle = title.match(regex)?.join('') || '';

  return validTitle;
};
