import { Todo } from '../types/Todo';

export const getMaxId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
