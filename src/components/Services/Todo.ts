import { Todo } from '../../Types/Todo';

export const findMaxUserId = (todos: Todo[]): number => {
  if (todos.length === 0) {
    return 1;
  }

  return Math.max(...todos.map(todo => todo.id)) + 1;
};
