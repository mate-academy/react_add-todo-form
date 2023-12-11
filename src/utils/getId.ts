import { Todo } from '../types';

export const getId = (todos:Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
