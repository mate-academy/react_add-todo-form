import { Todo } from '../types';

export const getNewId = (todos: Todo[]) => {
  return todos.length + 1;
};
