import { Todo } from '../types';

export const getMaxNumberId = (todos: Todo[]): number => {
  if (todos.length === 0) {
    return 1;
  }

  const result: number[] = todos.map(todo => todo.id);

  return Math.max(...result) + 1;
};
