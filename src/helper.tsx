import { Todo } from './types/Todo';
import usersFromServer from './api/users';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const normalizeInputValue = (value: string) => {
  const invalidSymbols = /[^a-zA-Za-åa-ö-w-я 0-9/ .,]/gi;

  return value.replaceAll(invalidSymbols, '');
};
