import { Todo } from '../types/types';

export const getMaxId = (todos: Todo[]): number => {
  return Math.max(...todos.map(todo => todo.id));
};
