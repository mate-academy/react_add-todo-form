import { Todo } from '../types/todo';

export const getMaxNumber = (todos: Todo[]): number => {
  if (!todos.length) {
    return 1;
  }

  const result: number[] = todos.map(todo => todo.id);

  return Math.max(...result) + 1;
};
