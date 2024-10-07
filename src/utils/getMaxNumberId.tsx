import { Todo } from '../types';

export const getMaxNumberId = (todos: Todo[]): number => {
  const result: number[] = todos.map(todo => todo.id);

  return Math.max(...result) + 1;
};
